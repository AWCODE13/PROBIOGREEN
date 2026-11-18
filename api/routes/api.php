<?php

use App\Http\Controllers\Api\V1\CalculatorController;
use App\Http\Controllers\Api\ProductController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::post('/calculator/calculate', CalculatorController::class)
        ->middleware('throttle:30,1');
    Route::get('/products', [ProductController::class, 'index']);
});
