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
        Schema::create('subscriptions', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('quota');
            $table->longText('description');
            $table->unsignedBigInteger('subscription_term_id');
            $table->unsignedBigInteger('billing_interval_id');
            $table->string('discount_type');
            $table->string('renewal_term');
            $table->string('renewal_type');
            $table->string('late_payment_charges');
            $table->string('status');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subscriptions');
    }
};
