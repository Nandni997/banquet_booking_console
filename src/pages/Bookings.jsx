import { useMemo, useState } from "react";
import Layout from "../layouts/Layout";
import BookingTable from "../components/booking/BookingTable";
import BookingDrawer from "../components/booking/BookingDrawer";
import BookingDetailsDrawer from "../components/booking/BookingDetailsDrawer";
import useHallStore from "../store/useHallStore";
import useBookingStore from "../store/useBookingStore";

function Bookings() {
  const { bookings, updateBooking, cancelBooking } = useBookingStore();
  const { halls } = useHallStore();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [hallFilter, setHallFilter] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filteredBookings = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return bookings.filter((booking) => {
      const matchesSearch =
        !keyword ||
        (booking.customerName || "").toLowerCase().includes(keyword) ||
        (booking.customerPhone || "").toLowerCase().includes(keyword) ||
        (booking.eventName || "").toLowerCase().includes(keyword) ||
        (booking.eventType || "").toLowerCase().includes(keyword);

      const matchesStatus = !statusFilter || booking.status === statusFilter;
      const matchesHall = !hallFilter || booking.hallName === hallFilter;

      return matchesSearch && matchesStatus && matchesHall;
    });
  }, [bookings, search, statusFilter, hallFilter]);

  const handleViewBooking = (booking) => {
    setSelectedBooking(booking);
    setDetailsOpen(true);
  };

  const handleEditBooking = (booking) => {
    setSelectedBooking(booking);
    setDetailsOpen(false);
    setDrawerOpen(true);
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
    setSelectedBooking(null);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedBooking(null);
  };

  const handleSaveBooking = (payload) => {
    if (!selectedBooking) return;

    updateBooking(selectedBooking.id, payload);
    setDrawerOpen(false);
    setSelectedBooking(null);
  };

  const handleCancelBooking = (bookingToCancel) => {
    cancelBooking(bookingToCancel.id);
    setSelectedBooking({
      ...bookingToCancel,
      status: "cancelled",
    });
  };

  const selectedCell = selectedBooking
    ? {
        date: selectedBooking.date,
        hall: halls.find((hall) => hall.id === selectedBooking.hallId),
      }
    : null;

  return (
    <Layout>
      <div className="space-y-5">
        <div className="bg-white rounded-2xl shadow-sm border p-5">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Bookings</h1>
            <p className="text-sm text-gray-500 mt-1">
              Search, filter, and manage all banquet bookings
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border p-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search customer, phone, event..."
              className="h-12 rounded-xl border border-gray-300 px-4"
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-12 rounded-xl border border-gray-300 px-4 bg-white"
            >
              <option value="">All Statuses</option>
              <option value="inquiry">Inquiry</option>
              <option value="tentative">Tentative</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
              <option value="completed">Completed</option>
            </select>

            <select
              value={hallFilter}
              onChange={(e) => setHallFilter(e.target.value)}
              className="h-12 rounded-xl border border-gray-300 px-4 bg-white"
            >
              <option value="">All Halls</option>
              {halls.map((hall) => (
                <option key={hall.id} value={hall.name}>
                  {hall.name}
                </option>
              ))}
            </select>

            <button
              onClick={() => {
                setSearch("");
                setStatusFilter("");
                setHallFilter("");
              }}
              className="h-12 rounded-xl border border-gray-300 bg-white hover:bg-gray-50"
            >
              Reset Filters
            </button>
          </div>
        </div>

        <BookingTable
          bookings={filteredBookings}
          onView={handleViewBooking}
          onEdit={handleEditBooking}
        />

        <BookingDetailsDrawer
          isOpen={detailsOpen}
          booking={selectedBooking}
          onClose={handleCloseDetails}
          onEdit={handleEditBooking}
          onCancelBooking={handleCancelBooking}
        />

        <BookingDrawer
          isOpen={drawerOpen}
          mode="edit"
          selectedCell={selectedCell}
          booking={selectedBooking}
          allBookings={bookings}
          onClose={handleCloseDrawer}
          onSave={handleSaveBooking}
        />
      </div>
    </Layout>
  );
}

export default Bookings;