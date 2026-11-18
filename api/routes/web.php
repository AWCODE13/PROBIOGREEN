<?php

use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/admin')->name('home');

Route::middleware(['auth', 'verified'])->prefix('admin')->group(function () {
    Route::get('/', DashboardController::class)->name('dashboard');
});

require __DIR__.'/settings.php';
