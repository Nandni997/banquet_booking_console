<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Hall extends Model
{
    use HasFactory;

    protected $fillable = [
        'location_id',
        'name',
        'capacity',
        'price_per_day'
    ];

    public function location()
    {
        return $this->belongsTo(Location::class);
    }

    public function bookings()
    {
        return $this->belongsToMany(Booking::class, 'booking_halls');
    }
}