<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Payment;

class PaymentController extends Controller
{
    /**
     * Display list of payments
     */
    public function index()
    {
        $payments = Payment::latest()->get();

        return response()->json([
            'status' => true,
            'data' => $payments
        ]);
    }

    /**
     * Store new payment
     */
    public function store(Request $request)
{
    $request->validate([
        'booking_id' => 'required|exists:bookings,id',
        'amount' => 'required|numeric',
        'payment_method' => 'required|string',
        'payment_date' => 'required|date',
        'note' => 'nullable|string'
    ]);

    $payment = \App\Models\Payment::create([
        'booking_id' => $request->booking_id,
        'amount' => $request->amount,
        'payment_method' => $request->payment_method,
        'payment_date' => $request->payment_date,
        'note' => $request->note
    ]);

    return response()->json([
        'status' => true,
        'message' => 'Payment created successfully',
        'data' => $payment
    ], 201);
}

    /**
     * Show single payment
     */
    public function show($id)
    {
        $payment = Payment::findOrFail($id);

        return response()->json([
            'status' => true,
            'data' => $payment
        ]);
    }

    /**
     * Update payment
     */
    public function update(Request $request, $id)
    {
        $payment = Payment::findOrFail($id);

        $payment->update($request->all());

        return response()->json([
            'status' => true,
            'message' => 'Payment updated successfully',
            'data' => $payment
        ]);
    }

    /**
     * Delete payment
     */
    public function destroy($id)
    {
        $payment = Payment::findOrFail($id);
        $payment->delete();

        return response()->json([
            'status' => true,
            'message' => 'Payment deleted successfully'
        ]);
    }
}