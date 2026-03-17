<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Booking;
use App\Services\BookingService;

class BookingController extends Controller
{

    public function index()
    {
        return Booking::with(['halls','customer','location'])->get();
    }


    public function store(Request $request, BookingService $bookingService)
    {

        $request->validate([
            'location_id' => 'required',
            'customer_id' => 'required',
            'event_date' => 'required|date',
            'start_time' => 'required',
            'end_time' => 'required',
            'hall_ids' => 'required|array'
        ]);

        // Check hall availability
        $available = $bookingService->checkHallAvailability(
            $request->hall_ids,
            $request->event_date,
            $request->start_time,
            $request->end_time
        );

        if (!$available) {
            return response()->json([
                'message' => 'Hall already booked for this time'
            ], 422);
        }

        // Create booking
        $booking = Booking::create([
            'location_id' => $request->location_id,
            'customer_id' => $request->customer_id,
            'event_date' => $request->event_date,
            'start_time' => $request->start_time,
            'end_time' => $request->end_time,
            'guest_count' => $request->guest_count,
            'event_type' => $request->event_type,
            'created_by' => auth()->id(),
            'status' => 'pending' // ✅ IMPORTANT
        ]);

        // Attach halls
        $booking->halls()->sync($request->hall_ids);

        return response()->json([
            'message' => 'Booking created successfully',
            'data' => $booking
        ]);
    }


    public function show(string $id)
    {
        return Booking::with(['halls','customer','location'])->findOrFail($id);
    }


    public function update(Request $request, string $id)
    {
        $booking = Booking::findOrFail($id);

        $booking->update($request->all());

        return response()->json($booking);
    }


    public function destroy(string $id)
    {
        Booking::destroy($id);

        return response()->json([
            'message' => 'Booking deleted'
        ]);
    }


    // ==============================
    // ✅ NEW STATUS APIs (DROP-IN)
    // ==============================

    public function confirm($id)
    {
        $booking = Booking::findOrFail($id);

        if ($booking->status !== 'pending') {
            return response()->json(['message' => 'Only pending bookings can be confirmed'], 400);
        }

        $booking->status = 'confirmed';
        $booking->save();

        return response()->json(['message' => 'Booking confirmed']);
    }


    public function cancel($id)
    {
        $booking = Booking::findOrFail($id);

        $booking->status = 'cancelled';
        $booking->save();

        return response()->json(['message' => 'Booking cancelled']);
    }


    public function complete($id)
    {
        $booking = Booking::findOrFail($id);

        if ($booking->status !== 'confirmed') {
            return response()->json(['message' => 'Only confirmed bookings can be completed'], 400);
        }

        $booking->status = 'completed';
        $booking->save();

        return response()->json(['message' => 'Booking completed']);
    }

}