<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Lead;

class LeadController extends Controller
{
    /**
     * Display all leads
     */
    public function index()
    {
        $leads = Lead::latest()->get();

        return response()->json([
            'status' => true,
            'data' => $leads
        ]);
    }

    /**
     * Store new lead
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'event_type' => 'nullable|string',
            'event_date' => 'nullable|date',
            'guest_count' => 'nullable|integer'
        ]);

        $lead = Lead::create([
            'name' => $request->name,
            'phone' => $request->phone,
            'event_type' => $request->event_type,
            'event_date' => $request->event_date,
            'guest_count' => $request->guest_count
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Lead created successfully',
            'data' => $lead
        ]);
    }

    /**
     * Show single lead
     */
    public function show($id)
    {
        $lead = Lead::findOrFail($id);

        return response()->json([
            'status' => true,
            'data' => $lead
        ]);
    }

    /**
     * Update lead
     */
    public function update(Request $request, $id)
    {
        $lead = Lead::findOrFail($id);

        $lead->update($request->all());

        return response()->json([
            'status' => true,
            'message' => 'Lead updated successfully',
            'data' => $lead
        ]);
    }

    /**
     * Delete lead
     */
    public function destroy($id)
    {
        $lead = Lead::findOrFail($id);
        $lead->delete();

        return response()->json([
            'status' => true,
            'message' => 'Lead deleted successfully'
        ]);
    }
}