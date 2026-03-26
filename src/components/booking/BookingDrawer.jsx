import { useEffect, useMemo, useState } from "react";
import Drawer from "../ui/Drawer";

function BookingDrawer({
  isOpen,
  mode = "create",
  selectedCell,
  booking,
  halls = [],
  allBookings = [],
  onClose,
  onSave,
}) {
  const timeOptions = [
    "00:00","01:00","02:00","03:00","04:00","05:00",
    "06:00","07:00","08:00","09:00","10:00","11:00",
    "12:00","13:00","14:00","15:00","16:00","17:00",
    "18:00","19:00","20:00","21:00","22:00","23:00",
  ];

  // ✅ keep ONLY API format
  const getInitialFormData = () => ({
    eventName: booking?.eventName || "",
    customerName: booking?.customerName || "",
    eventType: booking?.eventType || "",
    hallId: booking?.hallId || selectedCell?.hall?.id || "",
    date: booking?.date || selectedCell?.date || "", // YYYY-MM-DD
    startTime: booking?.startTime || "",
    endTime: booking?.endTime || "",
    guestCount: booking?.guestCount || "",
    customerPhone: booking?.customerPhone || "",
    customerEmail: booking?.customerEmail || "",
    customerAddress: booking?.customerAddress || "",
    status: booking?.status || "inquiry",
    notes: booking?.notes || "",
  });

  const [formData, setFormData] = useState(getInitialFormData());
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setFormData(getInitialFormData());
      setError("");
    }
  }, [isOpen, booking, selectedCell]);

  const selectedHall = useMemo(
    () => halls.find((hall) => hall.id === Number(formData.hallId)),
    [halls, formData.hallId]
  );

  const endTimeOptions = useMemo(() => {
    if (!formData.startTime) return timeOptions;
    return timeOptions.filter((time) => time > formData.startTime);
  }, [formData.startTime]);

  const hasTimeOverlap = () => {
    if (!formData.hallId || !formData.date || !formData.startTime || !formData.endTime) {
      return false;
    }

    return allBookings.some((existing) => {
      if (mode === "edit" && booking?.id === existing.id) return false;

      return (
        Number(existing.hallId) === Number(formData.hallId) &&
        existing.date === formData.date &&
        formData.startTime < existing.endTime &&
        formData.endTime > existing.startTime
      );
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!formData.hallId) return setError("Please select a hall.");
    if (!formData.date) return setError("Please select a date.");
    if (!formData.eventName.trim()) return setError("Please enter event name.");
    if (!formData.customerName.trim()) return setError("Please enter customer name.");
    if (!formData.startTime) return setError("Please select start time.");
    if (!formData.endTime) return setError("Please select end time.");

    if (formData.startTime >= formData.endTime) {
      return setError("End time must be later than start time.");
    }

    if (hasTimeOverlap()) {
      return setError("This hall already has a booking for the selected date and time.");
    }

    const payload = {
      ...booking,
      ...formData,
      hallId: Number(formData.hallId),
      hallName: selectedHall?.name || "",
      guestCount: Number(formData.guestCount || 0),
      date: formData.date, // ✅ API FORMAT
    };

    onSave?.(payload);
  };

  return (
    <Drawer
      isOpen={isOpen}
      title={mode === "edit" ? "Edit Booking" : "Add Booking"}
      onClose={onClose}
    >
      <div className="p-5">
        <div className="mb-5">
          <p className="text-sm text-gray-500">
            Booking For {selectedCell?.hall?.name || "Select Hall"} •{" "}
            {formData.date || "Select Date"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Hall</label>
              <select
                value={formData.hallId}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    hallId: Number(e.target.value) || "",
                  })
                }
                className="w-full rounded-xl border px-3 py-2"
              >
                <option value="">Select Hall</option>
                {halls.map((hall) => (
                  <option key={hall.id} value={hall.id}>
                    {hall.name}
                  </option>
                ))}
              </select>
            </div>

            {/* ✅ FIXED DATE INPUT */}
            <div>
              <label className="text-sm font-medium">Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    date: e.target.value, // ✅ keep raw
                  })
                }
                className="w-full rounded-xl border px-3 py-2"
              />
            </div>
          </div>

          {/* Remaining fields unchanged */}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="h-12 px-5 rounded-xl border"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="h-12 px-5 rounded-xl bg-primary text-white"
            >
              {mode === "edit" ? "Update Booking" : "Save Booking"}
            </button>
          </div>
        </form>
      </div>
    </Drawer>
  );
}

export default BookingDrawer;