<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('calculator_logs', function (Blueprint $table) {
            $table->id();
            $table->string('session_hash', 64)->nullable()->index();
            $table->string('mode', 16)->index();
            $table->foreignId('commodity_id')->nullable()->constrained()->nullOnDelete();
            $table->json('product_ids')->nullable();
            $table->json('payload');
            $table->json('result');
            $table->string('locale', 5)->default('id');
            $table->string('ip_hash', 64)->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('calculator_logs');
    }
};
