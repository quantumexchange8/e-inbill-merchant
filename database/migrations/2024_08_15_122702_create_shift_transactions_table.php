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
        Schema::create('shift_transactions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('merchant_id');
            $table->unsignedBigInteger('user_id');
            $table->string('shift_no');
            $table->double('starting_cash')->default(0.00);
            $table->double('cash_amount')->default(0.00);
            $table->double('cash_refund')->default(0.00);
            $table->double('paid_in')->default(0.00);
            $table->double('paid_out')->default(0.00);
            $table->double('expected_cash_amount')->default(0.00);
            $table->double('gross_sales')->default(0.00);
            $table->double('total_refund')->default(0.00);
            $table->double('total_discount')->default(0.00);
            $table->double('net_cash')->default(0.00);
            $table->double('net_card')->default(0.00);
            $table->double('net_sales')->default(0.00);
            $table->double('actual_cash')->default(0.00)->nullable();
            $table->double('difference')->default(0.00)->nullable();
            $table->dateTime('shift_opened')->nullable();
            $table->dateTime('shift_closed')->nullable();
            $table->string('status');
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shift_transactions');
    }
};
