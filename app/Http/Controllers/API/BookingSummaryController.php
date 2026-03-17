<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Booking;

class BookingSummaryController extends Controller
{
    public function show($id)
    {
        $booking = Booking::with(['halls', 'payments'])->findOrFail($id);

        // Calculate total amount (sum of hall prices)
        $totalAmount = $booking->halls->sum('price_per_day');

        // Calculate total paid
        $paidAmount = $booking->payments->sum('amount');

        // Remaining balance
        $balance = $totalAmount - $paidAmount;

        return response()->json([
            'booking_id' => $booking->id,
            'total_amount' => $totalAmount,
            'paid_amount' => $paidAmount,
            'balance' => $balance
        ]);
    }
}