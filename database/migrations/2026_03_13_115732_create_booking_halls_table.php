<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {

        // Drop table if exists (safe during development)
        if (Schema::hasTable('booking_halls')) {
            Schema::drop('booking_halls');
        }

        Schema::create('booking_halls', function (Blueprint $table) {

            $table->id();

            // Booking reference
            $table->foreignId('booking_id')
                ->constrained('bookings')
                ->cascadeOnDelete();

            // Hall reference
            $table->foreignId('hall_id')
                ->constrained('halls')
                ->cascadeOnDelete();

            $table->timestamps();

            // Prevent duplicate hall assignment
            $table->unique(['booking_id','hall_id']);

            // Helpful indexes
            $table->index('booking_id');
            $table->index('hall_id');

        });

    }

    public function down(): void
    {
        Schema::dropIfExists('booking_halls');
    }

};