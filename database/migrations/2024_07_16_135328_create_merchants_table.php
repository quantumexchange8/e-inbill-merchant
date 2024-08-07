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
        Schema::create('merchants', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('merchant_role_id');
            $table->string('merchant_name');
            $table->string('merchant_email');
            $table->string('password');
            $table->string('account_name');
            $table->string('tin_no');
            $table->string('irbm_client_id');
            $table->string('irbm_client_key');
            $table->string('registration_no');
            $table->string('classification_id');
            $table->string('address');
            $table->string('address_2');
            $table->string('postcode');
            $table->string('area');
            $table->string('state');
            $table->string('phone');
            $table->string('subscription_id')->nullable();
            $table->string('billing_interval_id')->nullable();
            $table->string('term_id')->nullable();
            $table->string('billing_start_date')->nullable();
            $table->string('billing_end_date')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('merchants');
    }
};
