<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    //Este metodo regresa todas las categorias.
    public function index()
    {
        $categories = Category::orderBy('created_at', 'DESC')->get();
        return response()->json([
            'status' => 200,
            'data' => $categories
        ]);
    }
    //Este metodo almacena una categoria en la base de datos.
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

        $category=new Category();
        $category->name=$request->name;
        $category->status=$request->status;
        $category->save();

         return response()->json([
                'status' => 200,
                'message' => 'La categoria se agrego exitosamente.',
                'data'=>$category
            ], 200);
    }
    //Este metodo regresa una sola categoria.
    public function show($id) {
         $category = Category::find($id);

        if($category==null){
            return response()->json([
                'status' => 404,
                'message' => 'La categoria no fue encontrada.',
                'data'=>[]
            ], 404);
        }
        return response()->json([
            'status' => 200,
            'data' => $category
        ]);
    }
    //Este metodo actualiza una categoria.
    public function update($id, Request $request) {

         $category = Category::find($id);

        if($category==null){
            return response()->json([
                'status' => 404,
                'message' => 'La categoria no fue encontrada.',
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

        $category->name=$request->name;
        $category->status=$request->status;
        $category->save();

         return response()->json([
                'status' => 200,
                'message' => 'La categoria se actualizo exitosamente.',
                'data'=>$category
            ], 200);
    }
    //Este metodo elimina una categoria.
    public function destroy($id) {
         $category = Category::find($id);

        if($category==null){
            return response()->json([
                'status' => 404,
                'message' => 'La categoria no fue encontrada.',
                'data'=>[]
            ], 404);
        }

        $category->delete();
         return response()->json([
                'status' => 200,
                'message' => 'La categoria se elimino exitosamente.'
            ], 200);
    }
}
