<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {

        // Drop table if exists (development safety)
        if (Schema::hasTable('customers')) {
            Schema::drop('customers');
        }

        Schema::create('customers', function (Blueprint $table) {

            $table->id();

            // Multi-location support
            $table->foreignId('location_id')
                ->nullable()
                ->constrained('locations')
                ->nullOnDelete();

            $table->string('name');

            $table->string('phone');

            $table->string('email')->nullable();

            $table->text('address')->nullable();

            $table->text('notes')->nullable();

            $table->timestamps();

            // Helpful indexes
            $table->index('phone');
            $table->index('location_id');

        });

    }

    public function down(): void
    {
        Schema::dropIfExists('customers');
    }

};