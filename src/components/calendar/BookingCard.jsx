const statusStyles = {
  inquiry: "bg-gray-100 border-l-4 border-gray-400 text-gray-700",
  tentative: "bg-amber-100 border-l-4 border-amber-500 text-amber-800",
  confirmed: "bg-emerald-100 border-l-4 border-emerald-500 text-emerald-800",
  cancelled: "bg-red-100 border-l-4 border-red-500 text-red-800",
  completed: "bg-blue-100 border-l-4 border-blue-500 text-blue-800",
};

function BookingCard({ booking, onClick }) {
  const formatTo24Hour = (time) => {
    if (!time) return "";

    if (/^\d{2}:\d{2}$/.test(time)) return time;

    const [timePart, modifier] = time.split(" ");
    if (!timePart || !modifier) return time;

    let [hours, minutes] = timePart.split(":").map(Number);
    const upper = modifier.toUpperCase();

    if (upper === "PM" && hours !== 12) hours += 12;
    if (upper === "AM" && hours === 12) hours = 0;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  };

  return (
    <div
      onClick={() => onClick?.(booking)}
      className={`rounded-2xl p-4 cursor-pointer hover:shadow-md transition ${
        statusStyles[booking.status?.toLowerCase()] ||
        "bg-purple-100 border-l-4 border-purple-500 text-purple-900"
      }`}
    >
      <h4 className="font-semibold text-base">
        {booking.eventName || booking.customerName}
      </h4>

      {booking.eventType && (
        <p className="text-sm opacity-80 mt-1">{booking.eventType}</p>
      )}

      <p className="text-sm mt-2">
        {formatTo24Hour(booking.startTime)} - {formatTo24Hour(booking.endTime)}
      </p>

      {booking.status && (
        <p className="text-sm font-medium mt-3 capitalize">{booking.status}</p>
      )}
    </div>
  );
}

export default BookingCard;