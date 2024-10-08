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
            $table->string('merchant_id');
            $table->string('merchant_name');
            $table->string('merchant_email')->nullable();
            $table->string('tin_no');
            $table->string('irbm_client_id')->nullable();
            $table->string('irbm_client_key')->nullable();
            $table->string('registration_no');
            $table->string('classification_id');
            $table->string('address');
            $table->string('address_2')->nullable();
            $table->string('postcode');
            $table->string('area');
            $table->string('state');
            $table->string('phone');
            $table->string('subscription_id')->nullable();
            $table->string('billing_interval_id')->nullable();
            $table->string('term_id')->nullable();
            $table->string('billing_start_date')->nullable();
            $table->string('billing_end_date')->nullable();
            $table->decimal('quota_balance', 13, 2)->nullable();
            $table->decimal('total_quota', 13, 2)->nullable();
            $table->string('sales_tax')->nullable();
            $table->string('service_tax')->nullable();
            $table->date('sst_effective_data')->nullable();
            $table->string('remember_token', 13, 2)->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
