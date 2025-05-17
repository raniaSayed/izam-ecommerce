<?php

use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\OrderController;
use \App\Http\Controllers\ProductController;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/api/products', [ProductController::class, 'index']);
    Route::post('/api/orders', [OrderController::class, 'store']);
    Route::get('/api/orders/{id}', [OrderController::class, 'show']);
});
