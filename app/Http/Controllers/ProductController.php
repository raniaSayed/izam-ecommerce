<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::query();

        $query->where('is_available', '=', '1');

        // Filtering
        if ($request->has('name')) {
            $query->where('name', 'like', '%' . $request->name . '%');
        }
        if ($request->has('price_min')) {
            $query->where('price', '>=', $request->price_min);
        }
        if ($request->has('price_max')) {
            $query->where('price', '<=', $request->price_max);
        }
        if ($request->has('category')) {
            $query->where('category', $request->category);
        }

        // Caching
        $products = Cache::remember('products', 60, function () use ($query) {
            return $query->paginate(10);
        });

        return response()->json($products);
    }
}
