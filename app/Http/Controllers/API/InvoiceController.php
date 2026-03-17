<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Mail;
use App\Mail\InvoiceMail;

class InvoiceController extends Controller
{
    // ✅ Generate & Download Invoice PDF
    public function generate($id)
    {
        $booking = Booking::with(['customer', 'halls', 'location'])->findOrFail($id);

        $total = 0;
        foreach ($booking->halls as $hall) {
            $price = $hall->price ?? 1000;
            $total += $price;
        }

        $gst = $total * 0.18;
        $grandTotal = $total + $gst;

        $data = compact('booking', 'total', 'gst', 'grandTotal');

        $pdf = Pdf::loadView('invoice', $data);

        return $pdf->download('invoice_'.$booking->id.'.pdf');
    }

    // ✅ Send Invoice via Email
    public function sendEmail($id)
    {
        $booking = Booking::with(['customer', 'halls', 'location'])->findOrFail($id);

        $total = 0;
        foreach ($booking->halls as $hall) {
            $price = $hall->price ?? 1000;
            $total += $price;
        }

        $gst = $total * 0.18;
        $grandTotal = $total + $gst;

        $data = compact('booking', 'total', 'gst', 'grandTotal');

        $pdf = Pdf::loadView('invoice', $data);

        // ✅ Send email with PDF
        Mail::to($booking->customer->email)->send(new InvoiceMail($pdf));

        return response()->json([
            'message' => 'Invoice email sent successfully'
        ]);
    }
}