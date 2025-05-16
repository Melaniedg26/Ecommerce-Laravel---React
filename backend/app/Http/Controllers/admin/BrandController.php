<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BrandController extends Controller
{
    //Este metodo regresa todas las marcas.
    public function index()
    {
        $brands = Brand::orderBy('created_at', 'DESC')->get();
        return response()->json([
            'status' => 200,
            'data' => $brands
        ]);
    }
    //Este metodo almacena una marca en la base de datos.
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ], 400);
        }

        $brand=new Brand();
        $brand->name=$request->name;
        $brand->status=$request->status;
        $brand->save();

         return response()->json([
                'status' => 200,
                'message' => 'La marca se agrego exitosamente.',
                'data'=>$brand
            ], 200);
    }
    //Este metodo regresa una sola marca.
    public function show($id) {
         $brand = Brand::find($id);

        if($brand==null){
            return response()->json([
                'status' => 404,
                'message' => 'La marca no fue encontrada.',
                'data'=>[]
            ], 404);
        }
        return response()->json([
            'status' => 200,
            'data' => $brand
        ]);
    }
    //Este metodo actualiza una marca.
    public function update($id, Request $request) {

         $brand = Brand::find($id);

        if($brand==null){
            return response()->json([
                'status' => 404,
                'message' => 'La marca no fue encontrada.',
                'data'=>[]
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ], 400);
        }

        $brand->name=$request->name;
        $brand->status=$request->status;
        $brand->save();

         return response()->json([
                'status' => 200,
                'message' => 'La marca se actualizo exitosamente.',
                'data'=>$brand
            ], 200);
    }
    //Este metodo elimina una marca.
    public function destroy($id) {
         $brand = Brand::find($id);

        if($brand==null){
            return response()->json([
                'status' => 404,
                'message' => 'La marca no fue encontrada.',
                'data'=>[]
            ], 404);
        }

        $brand->delete();
         return response()->json([
                'status' => 200,
                'message' => 'La marca se elimino exitosamente.'
            ], 200);
    }
}
