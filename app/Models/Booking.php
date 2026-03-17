<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $fillable = [
        'customer_id',
        'location_id',
        'event_date',
        'start_time',
        'end_time',
        'guest_count',
        'event_type',
        'status',
        'notes',
        'created_by'
    ];

    public function halls()
    {
    return $this->belongsToMany(Hall::class, 'booking_halls');
}
    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function location()
    {
        return $this->belongsTo(Location::class);
    }

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }
}