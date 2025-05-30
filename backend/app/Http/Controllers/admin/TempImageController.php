<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class TempImageController extends Controller
{
    //Este metodo almacenara una fotografia temporalmente
    public function store(Request $request)
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
        $tempImage = new TempImage();
        $tempImage->name = 'Ejemplo de nombre';
        $tempImage->save();

        $image = $request->file('image');
        $imageName = time() . '.' . $image->extension();
        $image->move(public_path('uploads/temp'), $imageName);

        $tempImage->name = $imageName;
        $tempImage->save();

        //Guardar el thumbnail (miniatura)
        // create image manager with desired driver
        $manager = new ImageManager(new Driver());
        // read image from file system
        $img = $manager->read(public_path('uploads/temp/' . $imageName));
        $img->coverDown(400, 450);
        $img->save(public_path('uploads/temp/thumb/' . $imageName));

        return response()->json([
            'status' => 200,
            'message' => 'La imagen se subio exitosamente.',
            'image' => $tempImage
        ], 200);
    }
    public function destroy($id)
    {
        $tempImage = TempImage::find($id);
        if ($tempImage) {
            if (!empty($tempImage->image)) {
                $sizes = ['large', 'small'];
                foreach ($sizes as $size) {
                    $path = public_path("uploads/products/{$size}/" . $tempImage->image);
                    if (file_exists($path) && is_file($path)) {
                        unlink($path);
                    }
                }
            }
            $tempImage->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Imagen eliminada correctamente.'
            ]);
        }
        return response()->json([
            'status' => 404,
            'message' => 'Imagen no encontrada.'
        ]);
    }
}
