<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Location;

class LocationController extends Controller
{

    public function index()
    {
        return response()->json(Location::all());
    }

    public function store(Request $request)
    {
        $location = Location::create($request->all());

        return response()->json($location,201);
    }

    public function show($id)
    {
        return Location::findOrFail($id);
    }

    public function update(Request $request,$id)
    {
        $location = Location::findOrFail($id);

        $location->update($request->all());

        return response()->json($location);
    }

    public function destroy($id)
    {
        Location::destroy($id);

        return response()->json([
            'message' => 'Location deleted'
        ]);
    }

}