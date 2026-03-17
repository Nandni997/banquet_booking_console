<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Booking;

class CalendarController extends Controller
{
    public function index(Request $request)
    {
        $request->validate([
            'month' => 'required|date_format:Y-m'
        ]);

        $month = $request->month;

        $bookings = Booking::with(['customer', 'halls'])
            ->whereMonth('event_date', date('m', strtotime($month)))
            ->whereYear('event_date', date('Y', strtotime($month)))
            ->get()
            ->groupBy('event_date');

        $result = [];

        foreach ($bookings as $date => $items) {
            $result[$date] = $items->map(function ($booking) {
                return [
                    'event_type' => $booking->event_type,
                    'customer' => $booking->customer->name ?? null,
                    'halls' => $booking->halls->pluck('name')->toArray(),
                    'start_time' => $booking->start_time,
                    'end_time' => $booking->end_time
                ];
            });
        }

        return response()->json($result);
    }
}