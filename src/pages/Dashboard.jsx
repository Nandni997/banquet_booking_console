import { useMemo } from "react";
import Layout from "../layouts/Layout";
import StatCard from "../components/dashboard/StatCard";
import RecentBookings from "../components/dashboard/RecentBookings";
import UpcomingEvents from "../components/dashboard/UpcomingEvents";
import useBookingStore from "../store/useBookingStore";
import useCustomerStore from "../store/useCustomerStore";
import useHallStore from "../store/useHallStore";
import useLocationStore from "../store/useLocationStore";

function Dashboard() {
  const { bookings } = useBookingStore();
  const { customers } = useCustomerStore();
  const { halls } = useHallStore();
  const { locations } = useLocationStore();

  const stats = useMemo(() => {
    const totalBookings = bookings.length;
    const confirmedBookings = bookings.filter(
      (booking) => booking.status === "confirmed"
    ).length;

    const tentativeBookings = bookings.filter(
      (booking) => booking.status === "tentative"
    ).length;

    const cancelledBookings = bookings.filter(
      (booking) => booking.status === "cancelled"
    ).length;

    const completedBookings = bookings.filter(
      (booking) => booking.status === "completed"
    ).length;

    const totalRevenue = bookings
      .filter((booking) => booking.status !== "cancelled")
      .reduce((sum, booking) => sum + Number(booking.totalAmount || 0), 0);

    const activeLocations = locations.filter(
      (location) => location.status === "active"
    ).length;

    const activeHalls = halls.filter(
      (hall) => hall.status === "active"
    ).length;

    return {
      totalBookings,
      confirmedBookings,
      tentativeBookings,
      cancelledBookings,
      completedBookings,
      totalRevenue,
      activeLocations,
      activeHalls,
      totalCustomers: customers.length,
    };
  }, [bookings, customers, halls, locations]);

  const recentBookings = useMemo(() => {
    return [...bookings].slice(-5).reverse();
  }, [bookings]);

  const upcomingEvents = useMemo(() => {
    return bookings
      .filter((booking) => booking.status !== "cancelled")
      .slice(0, 5);
  }, [bookings]);

  return (
    <Layout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="bg-white rounded-2xl border shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Dashboard
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Overview of bookings, customers, halls, locations, and revenue
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-4 gap-4">
          <StatCard
            title="Total Bookings"
            value={stats.totalBookings}
            subtitle="All bookings in the system"
            color="purple"
          />
          <StatCard
            title="Confirmed Bookings"
            value={stats.confirmedBookings}
            subtitle="Successfully confirmed events"
            color="green"
          />
          <StatCard
            title="Tentative Bookings"
            value={stats.tentativeBookings}
            subtitle="Holds awaiting confirmation"
            color="amber"
          />
          <StatCard
            title="Cancelled Bookings"
            value={stats.cancelledBookings}
            subtitle="Bookings marked as cancelled"
            color="red"
          />
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-5 gap-4">
          <StatCard
            title="Completed Events"
            value={stats.completedBookings}
            subtitle="Finished bookings"
            color="blue"
          />
          <StatCard
            title="Customers"
            value={stats.totalCustomers}
            subtitle="Registered customers"
            color="gray"
          />
          <StatCard
            title="Active Halls"
            value={stats.activeHalls}
            subtitle="Halls available for booking"
            color="green"
          />
          <StatCard
            title="Active Locations"
            value={stats.activeLocations}
            subtitle="Operational business locations"
            color="purple"
          />
          <StatCard
            title="Revenue"
            value={`₹ ${stats.totalRevenue}`}
            subtitle="Total non-cancelled booking value"
            color="amber"
          />
        </div>

        {/* Main content area */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          <RecentBookings bookings={recentBookings} />
          <UpcomingEvents bookings={upcomingEvents} />
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;