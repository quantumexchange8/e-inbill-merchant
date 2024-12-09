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
        Schema::create('invoice_transactions', function (Blueprint $table) {
            $table->id();
            $table->string('merchant_id');
            $table->string('receipt_no');
            $table->date('date_issue');
            $table->time('time_issue');
            $table->time('branch')->nullable();
            $table->decimal('total_amount', 13, 2);
            $table->string('invoice_type');
            $table->string('currency_code');
            $table->string('company_code');
            $table->string('address');
            $table->string('city');
            $table->string('postcode');
            $table->string('phone');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoice_transactions');
    }
};
