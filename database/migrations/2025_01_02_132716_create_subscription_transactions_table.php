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
        Schema::create('subscription_transactions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('merchant_id');
            $table->unsignedBigInteger('subscription_id');
            $table->string('invoice_no');
            $table->decimal('amount', 13, 2)->default(0.00);
            $table->string('payment_method');
            $table->dateTime('transaction_date');
            $table->string('status');
            $table->dateTime('expired_at');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subscription_transactions');
    }
};
