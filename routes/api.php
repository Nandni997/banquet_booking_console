<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\LocationController;
use App\Http\Controllers\API\HallController;
use App\Http\Controllers\API\CustomerController;
use App\Http\Controllers\API\LeadController;
use App\Http\Controllers\API\BookingController;
use App\Http\Controllers\API\PaymentController;
use App\Http\Controllers\API\CalendarController;
use App\Http\Controllers\API\HallAvailabilityController;
use App\Http\Controllers\API\BookingSummaryController;
use App\Http\Controllers\API\InvoiceController;

Route::prefix('v1')->group(function () {

    // Authentication
    Route::post('login',[AuthController::class,'login']);
    Route::post('logout',[AuthController::class,'logout']);

    // Locations
    Route::apiResource('locations',LocationController::class);

    // Halls
    Route::apiResource('halls',HallController::class);

    // Customers
    Route::apiResource('customers',CustomerController::class);

    // Leads
    Route::apiResource('leads',LeadController::class);

    // Payments
    Route::apiResource('payments', PaymentController::class);

    // ✅ CUSTOM ROUTES
    Route::get('calendar',[CalendarController::class,'index']);
    Route::get('halls/available', [HallAvailabilityController::class, 'available']);
    Route::get('bookings/{id}/summary', [BookingSummaryController::class, 'show']);

    // ✅ INVOICE ROUTES
    Route::get('bookings/{id}/invoice', [InvoiceController::class, 'generate']);
    Route::post('bookings/{id}/send-invoice', [InvoiceController::class, 'sendEmail']); // ⭐ NEW

    // ✅ STATUS ROUTES
    Route::post('bookings/{id}/confirm', [BookingController::class, 'confirm']);
    Route::post('bookings/{id}/cancel', [BookingController::class, 'cancel']);
    Route::post('bookings/{id}/complete', [BookingController::class, 'complete']);

    // ✅ Bookings (KEEP LAST)
    Route::apiResource('bookings', BookingController::class);

});