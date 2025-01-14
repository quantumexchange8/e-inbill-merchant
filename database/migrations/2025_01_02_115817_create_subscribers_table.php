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
        Schema::create('subscribers', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('merchant_id');
            $table->unsignedBigInteger('subscription_id');
            $table->decimal('total', 13, 2)->default(0);
            $table->decimal('discount', 13, 2)->default(0);
            $table->decimal('sst', 13, 2)->default(0);
            $table->decimal('round_up', 13, 2)->default(0);
            $table->decimal('grand_total', 13, 2)->default(0);
            $table->string('status');
            $table->integer('total_quota');
            $table->integer('quota_usage');
            $table->string('date_type');
            $table->dateTime('renew_at');
            $table->dateTime('expired_at');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subscribers');
    }
};
