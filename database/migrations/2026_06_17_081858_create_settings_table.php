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
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('site_name')->default('Caraka Muda');
            $table->unsignedInteger('founded')->default(2020);
            $table->string('tagline')->nullable();
            $table->boolean('recruitment_open')->default(false);
            $table->json('recruitment_info')->nullable();
            $table->json('contact')->nullable();
            $table->json('stats')->nullable();
            $table->json('values')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
