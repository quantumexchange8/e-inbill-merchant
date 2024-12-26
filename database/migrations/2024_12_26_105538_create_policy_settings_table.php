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
        Schema::create('policy_settings', function (Blueprint $table) {
            $table->id();
            $table->string('policy_type')->nullable();
            $table->integer('term')->nullable();
            $table->string('notify')->nullable();
            $table->longText('description')->nullable();
            $table->string('subs_renewal')->nullable();
            $table->string('expired_report_no')->nullable();
            $table->string('expired_report_date')->nullable();
            $table->string('reminder_no')->nullable();
            $table->string('reminder_date')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('policy_settings');
    }
};
