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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('shift_transaction_id');
            $table->string('receipt_no');
            $table->decimal('total_amount', 13, 2)->default('0.00');
            $table->string('transaction_type');
            $table->decimal('cash_in', 13, 2)->default('0.00');
            $table->decimal('cash_out', 13, 2)->default('0.00');
            $table->dateTime('transaction_date');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
