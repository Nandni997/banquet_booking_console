<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Hall;

class HallAvailabilityController extends Controller
{
    public function available(Request $request)
{
    // ✅ If no date passed, use today (or you can force validation)
    $date = $request->query('date') ?? date('Y-m-d');

    // Get all halls
    $halls = \App\Models\Hall::all();

    // Get bookings for that date
    $bookings = \App\Models\Booking::with('halls')
        ->whereDate('event_date', '=', $date)
        ->get();

    $result = [];

    foreach ($halls as $hall) {

        $isBooked = false;

        foreach ($bookings as $booking) {
            foreach ($booking->halls as $bookedHall) {
                if ((int)$bookedHall->id === (int)$hall->id) {
                    $isBooked = true;
                    break 2; // ✅ exit both loops
                }
            }
        }

        $result[] = [
            'hall_id' => $hall->id,
            'hall_name' => $hall->name,
            'date' => $date,
            'status' => $isBooked ? 'Booked' : 'Available'
        ];
    }

    return response()->json($result);
}
}