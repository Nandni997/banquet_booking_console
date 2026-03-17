<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lead extends Model
{
    protected $fillable = [
        'name',
        'phone',
        'email',
        'event_type',
        'event_date',
        'guest_count',
        'location_id',
        'created_by'
    ];
}