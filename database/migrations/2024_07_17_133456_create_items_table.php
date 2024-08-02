<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('items', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('merchant_id');
            $table->string('name');
            $table->decimal('price', 13, 2)->default('0.00');
            $table->unsignedBigInteger('classification_id');
            $table->string('sku');
            $table->unsignedMediumInteger('category_id');
            $table->double('cost', 13, 2)->default('0.00');
            $table->string('stock');
            $table->string('barcode');
            $table->string('status');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('items');
    }
};
