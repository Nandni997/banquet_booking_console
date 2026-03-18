<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function stats()
    {
        // Total bookings
        $totalBookings = Booking::count();

        // ✅ Calculate revenue manually
        $bookings = Booking::with('halls')->get();

        $totalRevenue = 0;

        foreach ($bookings as $booking) {
            foreach ($booking->halls as $hall) {
                $totalRevenue += $hall->price ?? 1000;
            }
        }

        // Status count
        $statusCounts = Booking::select('status', DB::raw('count(*) as count'))
            ->groupBy('status')
            ->get();

        // Monthly bookings
        $monthlyBookings = Booking::select(
                DB::raw('MONTH(event_date) as month'),
                DB::raw('count(*) as total')
            )
            ->groupBy('month')
            ->get();

        return response()->json([
            'total_bookings' => $totalBookings,
            'total_revenue' => $totalRevenue,
            'status_counts' => $statusCounts,
            'monthly_bookings' => $monthlyBookings
        ]);
    }
}