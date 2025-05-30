<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\ProductSizes;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;


use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class ProductController extends Controller
{
    //Este metodo regresa todos los productos.
    public function index()
    {
        $products = Product::orderBy('created_at', 'DESC')
            ->with(['product_images', 'product_sizes'])
            ->get();
        return response()->json([
            'status' => 200,
            'data' => $products
        ]);
    }
    //Este metodo almacena un nuevo producto.
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'price' => 'required|numeric',
            'category' => 'required|integer',
            'sku' => 'required|unique:products,sku',
            'is_featured' => 'required',
            'status' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ], 400);
        }

        $product = new Product();
        $product->title = $request->title;
        $product->price = $request->price;
        $product->compare_price = $request->compare_price;
        $product->category_id = $request->category;
        $product->brand_id = $request->brand;
        $product->sku = $request->sku;
        $product->barcode = $request->barcode;
        $product->quantity = $request->quantity;
        $product->description = $request->description;
        $product->short_description = $request->short_description;
        $product->status = $request->status;
        $product->is_featured = $request->is_featured;

        $product->save();

        if (!empty($request->sizes)) {
            foreach ($request->sizes as $sizeId) {
                $productSize = new ProductSizes();
                $productSize->size_id = $sizeId;
                $productSize->product_id = $product->id;
                $productSize->save();
            }
        }

        if (!empty($request->gallery)) {
            foreach ($request->gallery as $key => $tempImageId) {
                $tempImage = TempImage::find($tempImageId);

                //Thumbnail largo
                $extArray = explode('.', $tempImage->name);
                $ext = end($extArray);
                $rand = rand(1000, 10000);

                $imageName = uniqid($product->id . '-') . '.' . $ext;
                $manager = new ImageManager(Driver::class);
                $img = $manager->read(public_path('uploads/temp/' . $tempImage->name));
                $img->scaleDown(1200);
                $img->save(public_path('uploads/products/large/' . $imageName));

                //Thumbnail pequeño
                $manager = new ImageManager(Driver::class);
                $img = $manager->read(public_path('uploads/temp/' . $tempImage->name));
                $img->coverDown(400, 460);
                $img->save(public_path('uploads/products/small/' . $imageName));

                $productImage = new ProductImage();
                $productImage->image = $imageName;
                $productImage->product_id = $product->id;
                $productImage->save();

                if ($key == 0) {
                    $product->image = $imageName;
                    $product->save();
                }
            }
        }

        return response()->json([
            'status' => 200,
            'message' => 'El producto se agrego exitosamente.',
        ], 200);
    }
    //Este metodo regresa solo un producto.
    public function show($id)
    {
        $product = Product::with(['product_images', 'product_sizes'])
            ->find($id);

        if ($product == null) {
            return response()->json([
                'status' => 404,
                'message' => 'El producto no fue encontrado.',
                'data' => []
            ], 404);
        }

        $productSizes = $product->product_sizes()->pluck('size_id');

        return response()->json([
            'status' => 200,
            'data' => $product,
            'productSizes' => $productSizes

        ]);
    }
    //Este metodo actualiza un producto
    public function update($id, Request $request)
    {
        $product = Product::find($id);

        if ($product == null) {
            return response()->json([
                'status' => 404,
                'message' => 'El producto no fue encontrado.',
                'data' => []
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'price' => 'required|numeric',
            'category' => 'required|integer',
            'sku' => 'required',
            'is_featured' => 'required',
            'status' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ], 400);
        }

        $product->title = $request->title;
        $product->price = $request->price;
        $product->compare_price = $request->compare_price;
        $product->category_id = $request->category;
        $product->brand_id = $request->brand;
        $product->sku = $request->sku;
        $product->barcode = $request->barcode;
        $product->quantity = $request->quantity;
        $product->description = $request->description;
        $product->short_description = $request->short_description;
        $product->status = $request->status;
        $product->is_featured = $request->is_featured;

        $product->save();

        if (!empty($request->sizes)) {
            ProductSizes::where('product_id', $product->id)->delete();
            foreach ($request->sizes as $sizeId) {
                $productSize = new ProductSizes();
                $productSize->size_id = $sizeId;
                $productSize->product_id = $product->id;
                $productSize->save();
            }
        }

        return response()->json([
            'status' => 200,
            'message' => 'El producto se actualizo exitosamente.',
        ], 200);
    }
    //Este metodo elimina un producto
    public function destroy($id)
    {
        $product = Product::with('product_images')->find($id);

        if ($product == null) {
            return response()->json([
                'status' => 404,
                'message' => 'El producto no fue encontrado.',
                'data' => []
            ], 404);
        }

        $product->delete();
        if ($product->product_images) {
            foreach ($product->product_images as $productImage) {
                File::delete(public_path('uploads/products/large/' . $productImage->image));
                File::delete(public_path('uploads/products/small/' . $productImage->image));
            }
        }
        return response()->json([
            'status' => 200,
            'message' => 'El producto se elimino exitosamente.'
        ], 200);
    }
    public function saveProductImage(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpeg,png,jpg,gif'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ], 400);
        }

        //Guardar la imagen
        $image = $request->file('image');
        $imageName = $request->product_id . '-' . time() . '.' . $image->extension();
        //Thumbnail largo
        $manager = new ImageManager(Driver::class);
        $img = $manager->read($image->getPathname());
        $img->scaleDown(1200);
        $img->save(public_path('uploads/products/large/' . $imageName));

        //Thumbnail pequeño
        $manager = new ImageManager(Driver::class);
        $img = $manager->read($image->getPathname());
        $img->coverDown(400, 460);
        $img->save(public_path('uploads/products/small/' . $imageName));

        //insertar un registro en la tabla de product_images
        $productImage = new ProductImage();
        $productImage->image = $imageName;
        $productImage->product_id = $request->product_id;
        $productImage->save();

        return response()->json([
            'status' => 200,
            'message' => 'La imagen se subio exitosamente.',
            'image' => $productImage
        ], 200);
    }

    public function updateDefaultImage(Request $request)
    {
        $product = Product::find($request->product_id);
        $product->image = $request->image;
        $product->save();

        return response()->json([
            'status' => 200,
            'message' => 'La imagen principal se actualizo exitosamente.'
        ], 200);
    }

    public function deleteProductImage($id)
    {
        $productImage = ProductImage::find($id);
        if ($productImage == null) {
            return response()->json([
                'status' => 404,
                'message' => 'Imagen no encontrada.'
            ], 404);
        }
        File::delete(public_path('uploads/products/large/' . $productImage->image));
        File::delete(public_path('uploads/products/small/' . $productImage->image));

        $productImage->delete();

        return response()->json([
            'status' => 200,
            'message' => 'La imagen se elimino exitosamente.'
        ], 200);
    }
}
