function CalendarToolbar({
  selectedLocation,
  locationOptions = [],
  currentWeekLabel,
  onLocationChange,
  onPrevious,
  onToday,
  onNext,
  onAddBooking,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border p-4 mb-4">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Weekly Booking Calendar
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage bookings by hall and date
          </p>

          {currentWeekLabel && (
            <p className="text-sm text-primary font-medium mt-2">
              {currentWeekLabel}
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={selectedLocation}
            onChange={(e) => onLocationChange?.(e.target.value)}
            className="h-12 min-w-[180px] rounded-xl border border-gray-300 px-4 bg-white"
          >
            <option value="all">All Locations</option>
            {locationOptions.map((location) => (
              <option key={location.id} value={location.name}>
                {location.name}
              </option>
            ))}
          </select>

          <button
            onClick={onPrevious}
            className="h-12 px-5 rounded-xl border border-gray-300 bg-white hover:bg-gray-50"
          >
            Previous
          </button>

          <button
            onClick={onToday}
            className="h-12 px-5 rounded-xl border border-gray-300 bg-white hover:bg-gray-50"
          >
            Today
          </button>

          <button
            onClick={onNext}
            className="h-12 px-5 rounded-xl border border-gray-300 bg-white hover:bg-gray-50"
          >
            Next
          </button>

          <button
            onClick={onAddBooking}
            className="h-12 px-5 rounded-xl bg-primary text-white font-medium hover:opacity-90 transition"
          >
            + Add Booking
          </button>
        </div>
      </div>
    </div>
  );
}

export default CalendarToolbar;