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
        Schema::create('bikes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('parking_lot_id')->nullable();
            $table->unsignedBigInteger('user_id')->nullable();

            $table->foreign('parking_lot_id')->references('id')->on('parking_lots');
            $table->foreign('user_id')->references('id')->on('users');

            $table->string('code', 5)->unique();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bikes');
    }
};
