<?php

use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/admin')->name('home');

Route::middleware(['auth', 'verified'])->prefix('admin')->group(function () {
    Route::get('/', DashboardController::class)->name('dashboard');
    Route::get('/products', [ProductController::class, 'index'])->name('admin.products.index');
    Route::get('/products/{product}/edit', [ProductController::class, 'edit'])->name('admin.products.edit');
    Route::put('/products/{product}', [ProductController::class, 'update'])->name('admin.products.update');
});

require __DIR__.'/settings.php';
