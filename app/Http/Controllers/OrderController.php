<?php

namespace App\Http\Controllers;

use App\Events\OrderPlaced;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        // Validate
        $validatedOrder = $this->validateOrder($request);
        // Save
        $order = $this->saveOrder($validatedOrder, $request->total);
        // Response
        return response()->json($order, 201);
    }

    public function show($id)
    {
        $order = Order::with('products')->findOrFail($id);
        return response()->json($order);
    }

    public function validateOrder($request): array
    {
        return $request->validate([
            'products' => 'required|array',
            'products.*.id' => 'required|exists:products,id',
            'products.*.quantity' => 'required|integer|min:1',
            'total' => 'required|regex:/^\d+(\.\d{1,2})?$/',
        ]);
    }

    public function saveOrder($validatedOrder, $total)
    {
        $order = Order::create(['user_id' => auth()->id(), 'total' => 0]);
        $subtotal = 0;

        foreach ($validatedOrder['products'] as $productData) {
            $product = Product::findOrFail($productData['id']);
            // Check availability
            if ($product->quantity < $productData['quantity'] )  {
                return response()->json(['error' => 'Not enough stock'], 400);
            } else if($product->is_available === 0){
                return response()->json(['error' => $product->name .' with id '. $product->id .' is Not Available'], 400);
            }

            $order->products()->attach($product->id, ['quantity' => $productData['quantity']]);
            $subtotal += $product->price * $productData['quantity'];
        }
        if($total > $subtotal ){
            $order->total = $total;
        } else {
            $order->total = $subtotal;
        }
        $order->save();
        event(new OrderPlaced($order));
        return $order;
    }
}
