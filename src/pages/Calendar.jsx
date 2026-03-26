import { useEffect, useMemo, useState } from "react";
import Layout from "../layouts/Layout";
import CalendarToolbar from "../components/calendar/CalendarToolbar";
import CalendarGrid from "../components/calendar/CalendarGrid";
import BookingDrawer from "../components/booking/BookingDrawer";
import BookingDetailsDrawer from "../components/booking/BookingDetailsDrawer";
import { formatWeekLabel } from "../utils/dateFormat";
import useHallStore from "../store/useHallStore";
import useBookingStore from "../store/useBookingStore";
import useLocationStore from "../store/useLocationStore";

function Calendar() {
  const {
    bookings,
    addBooking,
    updateBooking,
    cancelBooking,
    fetchBookings,
  } = useBookingStore();

  const { halls, fetchHalls } = useHallStore();
  const { locations, fetchLocations } = useLocationStore();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedCell, setSelectedCell] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [drawerMode, setDrawerMode] = useState("create");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [weekOffset, setWeekOffset] = useState(0);
  

  useEffect(() => {
    fetchBookings();
    fetchHalls();
    fetchLocations();
  }, [fetchBookings, fetchHalls, fetchLocations]);

    const visibleDates = useMemo(() => {
      const today = new Date();

      const currentDate = new Date(today);
      const day = currentDate.getDay();

      const diff = currentDate.getDate() - day + (day === 0 ? -6 : 1);

      const startOfWeek = new Date(currentDate);
      startOfWeek.setDate(diff + weekOffset * 7);

      return Array.from({ length: 7 }).map((_, i) => {
        const d = new Date(startOfWeek);
        d.setDate(startOfWeek.getDate() + i);

        return d.toLocaleDateString("en-CA");  // API format
      });
    }, [weekOffset]);

  const weekLabel = useMemo(() => {
    return formatWeekLabel(visibleDates);
  }, [visibleDates]);

  const visibleHalls = useMemo(() => {
    if (selectedLocation === "all") return halls;
    return halls.filter((hall) => hall.location === selectedLocation);
  }, [halls, selectedLocation]);

  const visibleBookings = useMemo(() => {
    const allowedHallIds = visibleHalls.map((hall) => hall.id);

    return bookings.filter(
      (booking) =>
        allowedHallIds.includes(booking.hallId) &&
        visibleDates.includes(booking.date)
    );
  }, [bookings, visibleHalls, visibleDates]);

  const activeLocations = useMemo(() => {
    return locations.filter((location) => location.status === "active");
  }, [locations]);

  const currentSelectedBooking = useMemo(() => {
    if (!selectedBooking?.id) return null;

    return (
      bookings.find(
        (booking) => Number(booking.id) === Number(selectedBooking.id)
      ) || selectedBooking
    );
  }, [bookings, selectedBooking]);

  const handleAddBooking = ({ date, hall }) => {
    setSelectedCell({ date, hall });
    setSelectedBooking(null);
    setDrawerMode("create");
    setDetailsOpen(false);
    setDrawerOpen(true);
  };

  const handleToolbarAddBooking = () => {
    setSelectedCell(null);
    setSelectedBooking(null);
    setDrawerMode("create");
    setDetailsOpen(false);
    setDrawerOpen(true);
  };

  const handleBookingClick = (booking) => {
    setSelectedBooking(booking);
    setSelectedCell({
      date: booking.date,
      hall: halls.find((hall) => hall.id === booking.hallId),
    });
    setDrawerOpen(false);
    setDetailsOpen(true);
  };

  const handleEditFromDetails = (booking) => {
    setSelectedBooking(booking);
    setSelectedCell({
      date: booking.date,
      hall: halls.find((hall) => hall.id === booking.hallId),
    });
    setDrawerMode("edit");
    setDetailsOpen(false);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedCell(null);
    setSelectedBooking(null);
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
    setSelectedBooking(null);
  };

  const handleSaveBooking = async (payload) => {
    let result;

    if (drawerMode === "edit" && currentSelectedBooking) {
      result = await updateBooking(currentSelectedBooking.id, payload);
    } else {
      result = await addBooking(payload);
    }

    if (result?.success) {
      handleCloseDrawer();
    }
  };

  const handleCancelBooking = async (bookingToCancel) => {
    const result = await cancelBooking(bookingToCancel.id);

    if (result?.success) {
      setSelectedBooking((prev) =>
        prev
          ? {
              ...prev,
              status: result?.data?.status || "cancelled",
            }
          : prev
      );
    }
  };

  const handlePrevious = () => {
    setWeekOffset((prev) => prev - 1);
  };

  const handleToday = () => {
    setWeekOffset(0);
  };

  const handleNext = () => {
    setWeekOffset((prev) => prev + 1);
  };

  return (
    <Layout>
      <CalendarToolbar
        selectedLocation={selectedLocation}
        locationOptions={activeLocations}
        currentWeekLabel={weekLabel}
        onLocationChange={setSelectedLocation}
        onPrevious={handlePrevious}
        onToday={handleToday}
        onNext={handleNext}
        onAddBooking={handleToolbarAddBooking}
      />

      <CalendarGrid
        dates={visibleDates}
        halls={visibleHalls}
        bookings={visibleBookings}
        onAddBooking={handleAddBooking}
        onBookingClick={handleBookingClick}
      />

      <BookingDrawer
        isOpen={drawerOpen}
        mode={drawerMode}
        selectedCell={selectedCell}
        booking={currentSelectedBooking}
        halls={visibleHalls}
        allBookings={bookings}
        onClose={handleCloseDrawer}
        onSave={handleSaveBooking}
      />

      <BookingDetailsDrawer
        isOpen={detailsOpen}
        booking={currentSelectedBooking}
        onClose={handleCloseDetails}
        onEdit={handleEditFromDetails}
        onCancelBooking={handleCancelBooking}
      />
    </Layout>
  );
}

export default Calendar;