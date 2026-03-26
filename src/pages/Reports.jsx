import { useMemo } from "react";
import Layout from "../layouts/Layout";
import ReportStatCard from "../components/reports/ReportStatCard";
import SummaryTable from "../components/reports/SummaryTable";
import useBookingStore from "../store/useBookingStore";
import useCustomerStore from "../store/useCustomerStore";
import useHallStore from "../store/useHallStore";
import useLocationStore from "../store/useLocationStore";

function Reports() {
  const { bookings } = useBookingStore();
  const { customers } = useCustomerStore();
  const { halls } = useHallStore();
  const { locations } = useLocationStore();

  const reportStats = useMemo(() => {
    const activeBookings = bookings.filter(
      (booking) => booking.status !== "cancelled"
    );

    const totalRevenue = activeBookings.reduce(
      (sum, booking) => sum + Number(booking.totalAmount || 0),
      0
    );

    const totalAdvance = activeBookings.reduce(
      (sum, booking) => sum + Number(booking.advanceAmount || 0),
      0
    );

    const totalRemaining = activeBookings.reduce(
      (sum, booking) => sum + Number(booking.remainingAmount || 0),
      0
    );

    const confirmedCount = bookings.filter(
      (booking) => booking.status === "confirmed"
    ).length;

    const tentativeCount = bookings.filter(
      (booking) => booking.status === "tentative"
    ).length;

    const inquiryCount = bookings.filter(
      (booking) => booking.status === "inquiry"
    ).length;

    const completedCount = bookings.filter(
      (booking) => booking.status === "completed"
    ).length;

    const cancelledCount = bookings.filter(
      (booking) => booking.status === "cancelled"
    ).length;

    return {
      totalRevenue,
      totalAdvance,
      totalRemaining,
      confirmedCount,
      tentativeCount,
      inquiryCount,
      completedCount,
      cancelledCount,
      totalCustomers: customers.length,
      totalHalls: halls.length,
      totalLocations: locations.length,
    };
  }, [bookings, customers, halls, locations]);

  const hallPerformance = useMemo(() => {
    return halls.map((hall) => {
      const hallBookings = bookings.filter(
        (booking) => booking.hallName === hall.name && booking.status !== "cancelled"
      );

      const revenue = hallBookings.reduce(
        (sum, booking) => sum + Number(booking.totalAmount || 0),
        0
      );

      return {
        id: hall.id,
        hallName: hall.name,
        location: hall.location,
        bookingCount: hallBookings.length,
        revenue,
        averageRevenue:
          hallBookings.length > 0 ? Math.round(revenue / hallBookings.length) : 0,
      };
    });
  }, [halls, bookings]);

  const locationPerformance = useMemo(() => {
    return locations.map((location) => {
      const locationHalls = halls.filter((hall) => hall.location === location.name);
      const hallNames = locationHalls.map((hall) => hall.name);

      const locationBookings = bookings.filter(
        (booking) =>
          hallNames.includes(booking.hallName) && booking.status !== "cancelled"
      );

      const revenue = locationBookings.reduce(
        (sum, booking) => sum + Number(booking.totalAmount || 0),
        0
      );

      return {
        id: location.id,
        locationName: location.name,
        hallCount: locationHalls.length,
        bookingCount: locationBookings.length,
        revenue,
      };
    });
  }, [locations, halls, bookings]);

  const topCustomers = useMemo(() => {
    return customers
      .map((customer) => {
        const customerBookings = bookings.filter((booking) => {
          const bookingPhone = booking.customerPhone || "";
          const bookingName = booking.customerName || "";

          return (
            bookingPhone === customer.phone ||
            bookingName.toLowerCase().includes(customer.name.toLowerCase())
          );
        });

        const revenue = customerBookings
          .filter((booking) => booking.status !== "cancelled")
          .reduce((sum, booking) => sum + Number(booking.totalAmount || 0), 0);

        return {
          id: customer.id,
          customerName: customer.name,
          phone: customer.phone,
          bookingCount: customerBookings.length,
          revenue,
        };
      })
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);
  }, [customers, bookings]);

  const bookingStatusRows = [
    { id: 1, status: "Inquiry", count: reportStats.inquiryCount },
    { id: 2, status: "Tentative", count: reportStats.tentativeCount },
    { id: 3, status: "Confirmed", count: reportStats.confirmedCount },
    { id: 4, status: "Completed", count: reportStats.completedCount },
    { id: 5, status: "Cancelled", count: reportStats.cancelledCount },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="bg-white rounded-2xl border shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-800">Reports</h1>
          <p className="text-sm text-gray-500 mt-2">
            Revenue, booking trends, hall performance, and customer insights
          </p>
        </div>

        {/* Top KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-4 gap-4">
          <ReportStatCard
            title="Total Revenue"
            value={`₹ ${reportStats.totalRevenue}`}
            subtitle="From all non-cancelled bookings"
          />
          <ReportStatCard
            title="Advance Received"
            value={`₹ ${reportStats.totalAdvance}`}
            subtitle="Total advance collected"
          />
          <ReportStatCard
            title="Pending Balance"
            value={`₹ ${reportStats.totalRemaining}`}
            subtitle="Remaining amount to collect"
          />
          <ReportStatCard
            title="Total Customers"
            value={reportStats.totalCustomers}
            subtitle="Customers in CRM"
          />
        </div>

        {/* Secondary KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ReportStatCard
            title="Total Halls"
            value={reportStats.totalHalls}
            subtitle="Configured banquet halls"
          />
          <ReportStatCard
            title="Total Locations"
            value={reportStats.totalLocations}
            subtitle="Business locations in system"
          />
          <ReportStatCard
            title="Confirmed Bookings"
            value={reportStats.confirmedCount}
            subtitle="Currently confirmed events"
          />
        </div>

        {/* Summary Tables */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          <SummaryTable
            title="Booking Status Summary"
            subtitle="Count of bookings by stage"
            columns={[
              { key: "status", label: "Status" },
              { key: "count", label: "Count" },
            ]}
            rows={bookingStatusRows}
          />

          <SummaryTable
            title="Top Customers"
            subtitle="Customers ranked by booking revenue"
            columns={[
              { key: "customerName", label: "Customer" },
              { key: "phone", label: "Phone" },
              { key: "bookingCount", label: "Bookings" },
              {
                key: "revenue",
                label: "Revenue",
                render: (row) => `₹ ${row.revenue}`,
              },
            ]}
            rows={topCustomers}
          />
        </div>

        <SummaryTable
          title="Hall Performance"
          subtitle="Revenue and booking volume by hall"
          columns={[
            { key: "hallName", label: "Hall" },
            { key: "location", label: "Location" },
            { key: "bookingCount", label: "Bookings" },
            {
              key: "revenue",
              label: "Revenue",
              render: (row) => `₹ ${row.revenue}`,
            },
            {
              key: "averageRevenue",
              label: "Avg Revenue / Booking",
              render: (row) => `₹ ${row.averageRevenue}`,
            },
          ]}
          rows={hallPerformance}
        />

        <SummaryTable
          title="Location Performance"
          subtitle="Business performance by location"
          columns={[
            { key: "locationName", label: "Location" },
            { key: "hallCount", label: "Halls" },
            { key: "bookingCount", label: "Bookings" },
            {
              key: "revenue",
              label: "Revenue",
              render: (row) => `₹ ${row.revenue}`,
            },
          ]}
          rows={locationPerformance}
        />
      </div>
    </Layout>
  );
}

export default Reports;