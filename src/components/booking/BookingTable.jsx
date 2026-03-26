import { FlagIcon } from "@heroicons/react/24/solid";

function BookingTable({ bookings, onView, onEdit }) {
  const getStatusClasses = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-emerald-200 text-emerald-900";
      case "tentative":
        return "bg-amber-200 text-amber-900";
      case "cancelled":
        return "bg-red-200 text-red-900";
      case "completed":
        return "bg-blue-200 text-blue-900";
      case "inquiry":
        return "bg-gray-300 text-gray-900";
      default:
        return "bg-gray-200 text-gray-900";
    }
  };

  const parseDateString = (dateStr) => {
    if (!dateStr) return null;

    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      return new Date(`${dateStr}T00:00:00`);
    }

    const [day, month, year] = dateStr.split(" ");
    const monthIndex = new Date(`${month} 1, 2000`).getMonth();

    if (Number.isNaN(monthIndex)) return null;

    return new Date(Number(year), monthIndex, Number(day));
  };

  const formatDisplayDate = (dateStr) => {
    const date = parseDateString(dateStr);
    if (!date || Number.isNaN(date.getTime())) return dateStr || "-";

    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const nearestUpcomingDate = bookings.reduce((nearest, booking) => {
    if (booking.status === "cancelled") return nearest;

    const bookingDate = parseDateString(booking.date);
    if (!bookingDate || bookingDate < startOfToday) return nearest;

    if (!nearest || bookingDate < nearest) {
      return bookingDate;
    }

    return nearest;
  }, null);

  const formatDateKey = (date) => {
    if (!date) return "";
    return date.toDateString();
  };

  const nearestUpcomingDateKey = formatDateKey(nearestUpcomingDate);

  return (
    <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1050px]">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-5 py-4 text-sm font-semibold text-gray-700">
                Booking
              </th>
              <th className="text-left px-5 py-4 text-sm font-semibold text-gray-700">
                Customer
              </th>
              <th className="text-left px-5 py-4 text-sm font-semibold text-gray-700">
                Hall
              </th>
              <th className="text-left px-5 py-4 text-sm font-semibold text-gray-700">
                Date & Time
              </th>
              <th className="text-left px-5 py-4 text-sm font-semibold text-gray-700">
                Status
              </th>
              <th className="text-left px-5 py-4 text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking, index) => {
                const bookingDate = parseDateString(booking.date);
                const bookingDateKey = formatDateKey(bookingDate);
                const isNearestBooking =
                  nearestUpcomingDateKey &&
                  bookingDateKey === nearestUpcomingDateKey &&
                  booking.status !== "cancelled";

                const rowBgClass = isNearestBooking
                  ? "bg-yellow-50"
                  : index % 2 === 0
                  ? "bg-gray-100"
                  : "bg-white";

                return (
                  <tr
                    key={booking.id}
                    className={`border-b last:border-b-0 ${rowBgClass}`}
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-start gap-2">
                        {isNearestBooking && (
                          <FlagIcon className="h-4 w-4 text-amber-500 mt-1 shrink-0" />
                        )}

                        <div>
                          <div className="font-medium text-gray-800">
                            {booking.eventName || booking.customerName}
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            {booking.eventType || "-"}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-700">
                      <div>{booking.customerName || "-"}</div>
                      <div className="text-gray-500 mt-1">
                        {booking.customerPhone || "-"}
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-700">
                      {booking.hallName || "-"}
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-700">
                      <div className="font-medium text-gray-800">
                        {formatDisplayDate(booking.date)}
                      </div>
                      <div className="text-gray-500 mt-1">
                        {booking.startTime} – {booking.endTime}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusClasses(
                          booking.status
                        )}`}
                      >
                        {booking.status}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => onView?.(booking)}
                          className="h-10 px-4 rounded-xl bg-rose-500 text-white hover:bg-rose-600 transition"
                        >
                          View
                        </button>

                        <button
                          onClick={() => onEdit?.(booking)}
                          className="h-10 px-4 rounded-xl bg-primary text-white hover:opacity-90 transition"
                        >
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="px-5 py-10 text-center text-sm text-gray-500"
                >
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BookingTable;