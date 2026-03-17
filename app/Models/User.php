<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     */

    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'location_id'
    ];

    /**
     * The attributes that should be hidden.
     */

    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Attribute casting
     */

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    /**
     * Location relationship
     */

    public function location()
    {
        return $this->belongsTo(Location::class);
    }

    /**
     * Bookings created by this user
     */

    public function bookings()
    {
        return $this->hasMany(Booking::class,'created_by');
    }

    /**
     * Leads created by this user
     */

    public function leads()
    {
        return $this->hasMany(Lead::class,'created_by');
    }
}