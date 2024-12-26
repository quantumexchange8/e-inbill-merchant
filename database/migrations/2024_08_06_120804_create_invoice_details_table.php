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
        Schema::create('invoice_details', function (Blueprint $table) {
            $table->id();
            $table->string('prefix');
            $table->string('invoice_no');
            $table->string('company_name');
            $table->string('register_no');
            $table->string('msic_no');
            $table->string('sst_no');
            $table->string('tin_no');
            $table->string('business_activity_desc');
            $table->string('classification_code');
            $table->string('email');
            $table->string('dial_code');
            $table->string('phone');
            $table->string('contact_no');
            $table->string('company_address');
            $table->string('post_code');
            $table->string('area');
            $table->string('state');
            $table->longText('note');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoice_details');
    }
};
