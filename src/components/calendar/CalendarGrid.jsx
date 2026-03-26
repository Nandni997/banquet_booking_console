import BookingCard from "./BookingCard";

function CalendarGrid({ dates, halls, bookings, onAddBooking, onBookingClick }) {
  const todayStr = new Date().toLocaleDateString("en-CA");
  const getBookingsForCell = (date, hallId) => {
    return bookings.filter(
      (booking) => booking.date === date && booking.hallId === hallId
    );
  };

  const gridTemplateColumns = `180px repeat(${halls.length}, minmax(260px, 1fr))`;

  return (
    <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
      <div className="overflow-auto max-h-[75vh]">
        <div style={{ minWidth: `${180 + halls.length * 260}px` }}>
          <div
            className="bg-gray-50 border-b grid sticky top-0 z-30"
            style={{ gridTemplateColumns }}
          >
            <div className="p-4 font-semibold text-gray-700 border-r sticky left-0 z-40 bg-gray-50">
              Date
            </div>

            {halls.map((hall) => (
              <div
                key={hall.id}
                className="p-4 font-semibold text-gray-700 border-r last:border-r-0 bg-gray-50"
              >
                {hall.name}
              </div>
            ))}
          </div>

          {dates.map((date) => (
            <div
              key={date}
              className="grid border-b last:border-b-0"
              style={{ gridTemplateColumns }}
            >
              
              <div
                className={`p-4 border-r sticky left-0 z-20 min-h-[160px] flex items-center ${
                  date === todayStr ? "bg-purple-100" : "bg-white"
                }`}
              >
                <div
                  className={`font-semibold ${
                    date === todayStr ? "text-purple-700 font-bold" : "text-gray-800"
                  }`}
                >
                  {date}
                </div>
              </div>

              {halls.map((hall) => {
                const cellBookings = getBookingsForCell(date, hall.id);
                const hasBooking = cellBookings.length > 0;

                return (
                  <div
                    key={`${date}-${hall.id}`}
                    className="p-3 border-r last:border-r-0 min-h-[160px] bg-white"
                  >
                    <div className="h-full flex flex-col justify-center gap-3">
                      {!hasBooking ? (
                        <>
                          <div className="text-sm text-gray-400 text-center">
                            Available
                          </div>

                          <button
                            onClick={() => onAddBooking?.({ date, hall })}
                            className="w-full h-12 rounded-xl border border-dashed border-primary text-primary font-medium hover:bg-purple-50 transition"
                          >
                            + Add Booking
                          </button>
                        </>
                      ) : (
                        cellBookings.map((booking) => (
                          <BookingCard
                            key={booking.id}
                            booking={booking}
                            onClick={onBookingClick}
                          />
                        ))
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CalendarGrid;