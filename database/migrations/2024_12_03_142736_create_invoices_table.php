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
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('merchant_id');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('transaction_id');
            $table->string('invoice_no')->nullable();
            $table->string('invoice_type')->nullable();
            $table->decimal('total_amount', 13, 2)->default('0.00');
            $table->string('payment_type');
            $table->string('transaction_type');
            $table->dateTime('transaction_date');
            $table->string('invoice_status')->default(0);
            $table->string('remark');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoices');
    }
};
