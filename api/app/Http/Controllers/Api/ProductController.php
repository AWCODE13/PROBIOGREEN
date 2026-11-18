<?php

namespace App\Http\Controllers\Api;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $category = $request->query('category');
        
        $query = Product::query()
            ->where('is_active', true)
            ->with(['translations', 'variants'])
            ->orderBy('sort');
        
        if ($category) {
            $query->where('category', $category);
        }
        
        $products = $query->get()->map(function ($product) {
            return [
                'id' => $product->id,
                'slug' => $product->slug,
                'category' => $product->category,
                'name' => $product->nameFor('id'),
                'form' => $product->form,
                'price_visible' => $product->price_visible,
                'variants' => $product->variants->map(fn ($v) => [
                    'id' => $v->id,
                    'label' => $v->label,
                    'volume_ml' => $v->volume_ml,
                    'price_idr' => $v->price_idr,
                ])->toArray(),
            ];
        });
        
        return response()->json([
            'data' => $products,
            'categories' => ['pertanian', 'peternakan', 'perikanan', 'perkebunan'],
        ]);
    }
}
