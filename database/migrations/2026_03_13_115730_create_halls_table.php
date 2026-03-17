<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {

        // Drop table if exists (safe during development)
        if (Schema::hasTable('halls')) {
            Schema::drop('halls');
        }

        Schema::create('halls', function (Blueprint $table) {

            $table->id();

            // Relation to locations
            $table->foreignId('location_id')
                ->constrained('locations')
                ->cascadeOnDelete();

            $table->string('name');

            $table->integer('capacity');

            $table->decimal('price', 10, 2)->nullable();

            $table->boolean('status')->default(true);

            $table->text('description')->nullable();

            $table->timestamps();

            // Index for faster queries
            $table->index('location_id');

        });

    }

    public function down(): void
    {
        Schema::dropIfExists('halls');
    }

};