\<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {

        // Drop table if exists (safe during development)
        if (Schema::hasTable('leads')) {
            Schema::drop('leads');
        }

        Schema::create('leads', function (Blueprint $table) {

            $table->id();

            // Multi-location support
            $table->foreignId('location_id')
                ->nullable()
                ->constrained('locations')
                ->nullOnDelete();

            // Lead details
            $table->string('name');

            $table->string('phone');

            $table->string('email')->nullable();

            // Event info
            $table->date('event_date')->nullable();

            $table->integer('guest_count')->nullable();

            $table->string('event_type')->nullable();

            // Lead source
            $table->string('source')->nullable();

            // Lead status
            $table->enum('status', [
                'new',
                'follow_up',
                'converted',
                'lost'
            ])->default('new');

            // Follow-up tracking
            $table->date('follow_up_date')->nullable();

            $table->text('follow_up_notes')->nullable();

            // Notes
            $table->text('notes')->nullable();

            // User who created lead
            $table->foreignId('created_by')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            $table->timestamps();

            // Useful indexes
            $table->index('phone');
            $table->index('location_id');

        });

    }

    public function down(): void
    {
        Schema::dropIfExists('leads');
    }

};