import Drawer from "../ui/Drawer";
import useBookingStore from "../../store/useBookingStore";

function formatTo24Hour(time) {
  if (!time) return "-";

  if (/^\d{2}:\d{2}$/.test(time)) return time;

  const [timePart, modifier] = time.split(" ");
  if (!timePart || !modifier) return time;

  let [hours, minutes] = timePart.split(":").map(Number);
  const upper = modifier.toUpperCase();

  if (upper === "PM" && hours !== 12) hours += 12;
  if (upper === "AM" && hours === 12) hours = 0;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

function DetailItem({ label, value }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4">
      <div className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-500">
        {label}
      </div>
      <div className="text-sm font-semibold text-gray-800">
        {value || "-"}
      </div>
    </div>
  );
}

const statusStyles = {
  inquiry: "bg-gray-100 text-gray-700 border-gray-200",
  tentative: "bg-amber-100 text-amber-800 border-amber-200",
  confirmed: "bg-emerald-100 text-emerald-800 border-emerald-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
  completed: "bg-blue-100 text-blue-800 border-blue-200",
};

function BookingDetailsDrawer({
  isOpen,
  booking,
  onClose,
  onEdit,
  onCancelBooking,
}) {
  const { confirmBooking, completeBooking } = useBookingStore();

  if (!booking) {
    return (
      <Drawer isOpen={isOpen} title="Booking Details" onClose={onClose}>
        <div className="p-5">
          <div className="text-sm text-gray-500">No booking selected.</div>
        </div>
      </Drawer>
    );
  }

  const total =
    booking.totalAmount ??
    Number(booking.hallPrice || 0) +
      Number(booking.decorationPrice || 0) +
      Number(booking.extraCharges || 0) +
      Number(booking.tax || 0) -
      Number(booking.discount || 0);

  const remaining =
    booking.remainingAmount ?? total - Number(booking.advanceAmount || 0);

  const handleConfirm = async () => {
    await confirmBooking(booking.id);
  };

  const handleComplete = async () => {
    await completeBooking(booking.id);
  };

  return (
    <Drawer isOpen={isOpen} title="Booking Details" onClose={onClose}>
      <div className="space-y-6 p-5">
        <div className="rounded-2xl border border-purple-100 bg-purple-50 p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-lg font-semibold text-gray-900">
                {booking.eventName || booking.customerName}
              </div>
              <div className="mt-1 text-sm text-gray-600">
                {booking.hallName || "Hall not available"} • {booking.date || "-"}
              </div>
              <div className="mt-1 text-sm text-gray-600">
                {formatTo24Hour(booking.startTime)} – {formatTo24Hour(booking.endTime)}
              </div>
            </div>

            <span
              className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold capitalize ${
                statusStyles[booking.status] || statusStyles.inquiry
              }`}
            >
              {booking.status}
            </span>
          </div>
        </div>

        <section>
          <h3 className="mb-3 text-base font-semibold text-gray-800">
            Event Information
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <DetailItem label="Event Type" value={booking.eventType} />
            <DetailItem label="Guest Count" value={booking.guestCount} />
            <DetailItem label="Hall" value={booking.hallName} />
            <DetailItem label="Date" value={booking.date} />
            <DetailItem label="Start Time" value={formatTo24Hour(booking.startTime)} />
            <DetailItem label="End Time" value={formatTo24Hour(booking.endTime)} />
          </div>
        </section>

        <section>
          <h3 className="mb-3 text-base font-semibold text-gray-800">
            Customer Details
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <DetailItem label="Customer Name" value={booking.customerName} />
            <DetailItem label="Phone" value={booking.customerPhone} />
            <DetailItem label="Email" value={booking.customerEmail} />
            <DetailItem label="Address" value={booking.customerAddress} />
          </div>
        </section>

        <section>
          <h3 className="mb-3 text-base font-semibold text-gray-800">
            Pricing & Payment
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <DetailItem label="Hall Price" value={`₹ ${booking.hallPrice || 0}`} />
            <DetailItem
              label="Decoration Price"
              value={`₹ ${booking.decorationPrice || 0}`}
            />
            <DetailItem
              label="Extra Charges"
              value={`₹ ${booking.extraCharges || 0}`}
            />
            <DetailItem label="Discount" value={`₹ ${booking.discount || 0}`} />
            <DetailItem label="Tax" value={`₹ ${booking.tax || 0}`} />
            <DetailItem label="Total Amount" value={`₹ ${total}`} />
            <DetailItem
              label="Advance Amount"
              value={`₹ ${booking.advanceAmount || 0}`}
            />
            <DetailItem label="Remaining Amount" value={`₹ ${remaining}`} />
            <DetailItem label="Payment Mode" value={booking.paymentMode} />
          </div>
        </section>

        <section>
          <h3 className="mb-3 text-base font-semibold text-gray-800">
            Notes
          </h3>

          <div className="min-h-[90px] rounded-2xl border border-gray-200 bg-white p-4 text-sm text-gray-700">
            {booking.notes || "No notes added."}
          </div>
        </section>

        <div className="sticky bottom-0 bg-white pt-3">
          <div className="grid grid-cols-5 gap-3">
            <button
              type="button"
              onClick={onClose}
              className="h-12 rounded-xl border border-gray-300 bg-white font-medium hover:bg-gray-50"
            >
              Close
            </button>

            <button
              type="button"
              onClick={() => onEdit?.(booking)}
              className="h-12 rounded-xl border border-primary bg-white font-medium text-primary hover:bg-purple-50"
            >
              Edit
            </button>

            <button
              type="button"
              onClick={() => onCancelBooking?.(booking)}
              disabled={booking.status === "cancelled"}
              className={`h-12 rounded-xl font-medium ${
                booking.status === "cancelled"
                  ? "cursor-not-allowed bg-gray-200 text-gray-500"
                  : "bg-red-500 text-white hover:bg-red-600"
              }`}
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleConfirm}
              disabled={booking.status === "confirmed" || booking.status === "completed"}
              className={`h-12 rounded-xl font-medium ${
                booking.status === "confirmed" || booking.status === "completed"
                  ? "cursor-not-allowed bg-gray-200 text-gray-500"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              Confirm
            </button>

            <button
              type="button"
              onClick={handleComplete}
              disabled={booking.status === "completed" || booking.status === "cancelled"}
              className={`h-12 rounded-xl font-medium ${
                booking.status === "completed" || booking.status === "cancelled"
                  ? "cursor-not-allowed bg-gray-200 text-gray-500"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Complete
            </button>
          </div>
        </div>
      </div>
    </Drawer>
  );
}

export default BookingDetailsDrawer;