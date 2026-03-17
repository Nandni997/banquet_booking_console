<?php

namespace App\Services;

use App\Models\Booking;
use App\Models\Hall;

class BookingService
{

    public function checkHallAvailability($hallIds, $eventDate, $startTime, $endTime)
    {

        $conflicts = Booking::whereDate('event_date', $eventDate)
            ->where(function ($query) use ($startTime, $endTime) {

                $query->whereBetween('start_time', [$startTime, $endTime])
                      ->orWhereBetween('end_time', [$startTime, $endTime]);

            })
            ->whereHas('halls', function ($query) use ($hallIds) {
                $query->whereIn('halls.id', $hallIds);
            })
            ->exists();

        return !$conflicts;

    }

}