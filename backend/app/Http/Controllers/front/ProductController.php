<?php

namespace App\Http\Controllers\front;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ProductController extends Controller
{
    public function latestProducts(){
        $products=Product::orderBy('created_at','DESC')
        ->where('status',1)
        ->limit(8)
        ->get();
        return response()->json([
            'status'=>200,
            'data'=>$products
        ],200);
    }
      public function featuredProducts(){
        $products=Product::orderBy('created_at','DESC')
        ->where('is_featured','yes')
        ->limit(8)
        ->get();
        return response()->json([
            'status'=>200,
            'data'=>$products
        ],200);
    }
}
