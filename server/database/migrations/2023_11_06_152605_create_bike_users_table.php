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
        Schema::create('bike_users', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('bike_id');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('starting_parking_lot_id');
            $table->unsignedBigInteger('ending_parking_lot_id')->nullable();

            $table->foreign('bike_id')->references('id')->on('bikes');
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('starting_parking_lot_id')->references('id')->on('parking_lots');
            $table->foreign('ending_parking_lot_id')->references('id')->on('parking_lots');

            $table->timestamp('starts_at');
            $table->timestamp('ends_at')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bike_users');
    }
};
