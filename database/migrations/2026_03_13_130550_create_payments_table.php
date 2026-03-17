<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {

        // Drop table if exists (safe for development)
        if (Schema::hasTable('payments')) {
            Schema::drop('payments');
        }

        Schema::create('payments', function (Blueprint $table) {

            $table->id();

            // Booking reference
            $table->foreignId('booking_id')
                ->constrained('bookings')
                ->cascadeOnDelete();

            // Payment amount
            $table->decimal('amount', 10, 2);

            // Payment method
            $table->enum('payment_method', [
                'cash',
                'upi',
                'bank_transfer',
                'card'
            ]);

            // Payment type
            $table->enum('payment_type', [
                'advance',
                'final'
            ])->default('advance');

            // Optional transaction id
            $table->string('transaction_id')->nullable();

            $table->date('payment_date')->nullable();

            $table->text('notes')->nullable();

            $table->timestamps();

            // Index
            $table->index('booking_id');

        });

    }

    public function down(): void
    {
        Schema::dropIfExists('payments');
    }

};