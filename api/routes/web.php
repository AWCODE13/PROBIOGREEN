<?php

use Illuminate\Support\Facades\Route;

Route::redirect('/', '/admin')->name('home');

Route::middleware(['auth', 'verified'])->prefix('admin')->group(function () {
    Route::inertia('/', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
