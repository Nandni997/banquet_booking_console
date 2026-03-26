import { formatDisplayDate } from "../../utils/dateFormat";

function UpcomingEvents({ bookings = [] }) {
  const getStatusClasses = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-emerald-100 text-emerald-800";
      case "tentative":
        return "bg-amber-100 text-amber-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "inquiry":
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-white rounded-2xl border shadow-sm p-5">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Upcoming Events
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Events scheduled in the system
        </p>
      </div>

      {bookings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="rounded-2xl border border-gray-200 bg-gray-50 p-4"
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-3">
                  <div className="font-semibold text-gray-800">
                    {booking.eventName || booking.customerName}
                  </div>

                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusClasses(
                      booking.status
                    )}`}
                  >
                    {booking.status}
                  </span>
                </div>

                <div className="text-sm text-gray-600">
                  {booking.eventType} • {booking.hallName}
                </div>

                <div className="text-sm text-gray-500">
                  {formatDisplayDate(booking.date)} • {booking.startTime} – {booking.endTime}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-gray-300 p-8 text-center text-sm text-gray-500">
          No upcoming events available.
        </div>
      )}
    </div>
  );
}

export default UpcomingEvents;