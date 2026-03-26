import { useEffect, useMemo, useState } from "react";
import Layout from "../layouts/Layout";
import CustomerTable from "../components/customer/CustomerTable";
import CustomerDrawer from "../components/customer/CustomerDrawer";
import useCustomerStore from "../store/useCustomerStore";
import useBookingStore from "../store/useBookingStore";

function Customers() {
  const {
    customers,
    addCustomer,
    updateCustomer,
    fetchCustomers,
  } = useCustomerStore();

  const { bookings } = useBookingStore();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState("create");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [search, setSearch] = useState("");
  const [historyCustomer, setHistoryCustomer] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const enrichedCustomers = useMemo(() => {
    return customers.map((customer) => {
      const totalBookings = bookings.filter((booking) => {
        const bookingPhone = booking.customerPhone || "";
        const bookingName = booking.customerName || "";

        return (
          bookingPhone === customer.phone ||
          bookingName.toLowerCase().includes((customer.name || "").toLowerCase())
        );
      }).length;

      return {
        ...customer,
        totalBookings,
      };
    });
  }, [customers, bookings]);

  const filteredCustomers = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) return enrichedCustomers;

    return enrichedCustomers.filter((customer) => {
      return (
        (customer.name || "").toLowerCase().includes(keyword) ||
        (customer.phone || "").toLowerCase().includes(keyword) ||
        (customer.email || "").toLowerCase().includes(keyword)
      );
    });
  }, [enrichedCustomers, search]);

  const customerHistory = useMemo(() => {
    if (!historyCustomer) return [];

    return bookings.filter((booking) => {
      const bookingPhone = booking.customerPhone || "";
      const bookingName = booking.customerName || "";

      return (
        bookingPhone === historyCustomer.phone ||
        bookingName.toLowerCase().includes((historyCustomer.name || "").toLowerCase())
      );
    });
  }, [historyCustomer, bookings]);

  const handleAddCustomer = () => {
    setSelectedCustomer(null);
    setDrawerMode("create");
    setDrawerOpen(true);
  };

  const handleEditCustomer = (customer) => {
    setSelectedCustomer(customer);
    setDrawerMode("edit");
    setDrawerOpen(true);
  };

  const handleSaveCustomer = async (formData) => {
    if (drawerMode === "edit" && selectedCustomer) {
      await updateCustomer(selectedCustomer.id, formData);
    } else {
      await addCustomer(formData);
    }

    setDrawerOpen(false);
    setSelectedCustomer(null);
  };

  const handleViewHistory = (customer) => {
    setHistoryCustomer(customer);
  };

  const handleCloseHistory = () => {
    setHistoryCustomer(null);
  };

  return (
    <Layout>
      <div className="space-y-5">
        <div className="bg-white rounded-2xl shadow-sm border p-5">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Customers</h1>
              <p className="text-sm text-gray-500 mt-1">
                Manage banquet customers and view their booking history
              </p>
            </div>

            <button
              onClick={handleAddCustomer}
              className="h-12 px-5 rounded-xl bg-primary text-white font-medium hover:opacity-95"
            >
              + Add Customer
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border p-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by customer name, phone, or email"
            className="h-12 w-full rounded-xl border border-gray-300 px-4"
          />
        </div>

        <CustomerTable
          customers={filteredCustomers}
          onEdit={handleEditCustomer}
          onViewHistory={handleViewHistory}
        />

        {historyCustomer && (
          <div className="bg-white rounded-2xl shadow-sm border p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Booking History
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {historyCustomer.name} • {historyCustomer.phone}
                </p>
              </div>

              <button
                onClick={handleCloseHistory}
                className="h-10 px-4 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
            </div>

            {customerHistory.length > 0 ? (
              <div className="space-y-3">
                {customerHistory.map((booking) => (
                  <div
                    key={booking.id}
                    className="rounded-2xl border border-gray-200 p-4"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">
                      <div>
                        <div className="font-semibold text-gray-800">
                          {booking.eventName || booking.customerName}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {booking.eventType} • {booking.hallName} • {booking.date}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {booking.startTime} – {booking.endTime}
                        </div>
                      </div>

                      <span className="inline-flex w-fit rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold capitalize text-gray-700">
                        {booking.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-gray-300 p-8 text-center text-sm text-gray-500">
                No booking history found for this customer.
              </div>
            )}
          </div>
        )}

        <CustomerDrawer
          isOpen={drawerOpen}
          customer={selectedCustomer}
          mode={drawerMode}
          onClose={() => {
            setDrawerOpen(false);
            setSelectedCustomer(null);
          }}
          onSave={handleSaveCustomer}
        />
      </div>
    </Layout>
  );
}

export default Customers;