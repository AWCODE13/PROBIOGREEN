<?php

use App\Http\Controllers\Api\V1\CalculatorController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::post('/calculator/calculate', CalculatorController::class)
        ->middleware('throttle:30,1');
});
