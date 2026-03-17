<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {

        // Drop table if exists (safe during development)
        if (Schema::hasTable('bookings')) {
            Schema::drop('bookings');
        }

        Schema::create('bookings', function (Blueprint $table) {

            $table->id();

            // Location of booking
            $table->foreignId('location_id')
                ->constrained('locations')
                ->cascadeOnDelete();

            // Customer who booked
            $table->foreignId('customer_id')
                ->constrained('customers')
                ->cascadeOnDelete();

            // Event information
            $table->date('event_date');

            $table->time('start_time');

            $table->time('end_time');

            $table->integer('guest_count')->nullable();

            $table->string('event_type')->nullable();

            // Booking status
            $table->enum('status', [
                'pending',
                'confirmed',
                'cancelled',
                'completed'
            ])->default('pending');

            // Notes
            $table->text('notes')->nullable();

            // User who created booking
            $table->foreignId('created_by')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            $table->timestamps();

            // Indexes for performance
            $table->index('event_date');
            $table->index('location_id');

        });

    }

    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }

};