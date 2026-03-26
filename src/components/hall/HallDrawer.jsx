import { useEffect, useState } from "react";
import Drawer from "../ui/Drawer";
import useLocationStore from "../../store/useLocationStore";

const defaultForm = {
  name: "",
  location: "",
  capacity: "",
  basePrice: "",
  status: "active",
  description: "",
};

function HallDrawer({ isOpen, hall, mode = "create", onClose, onSave }) {
  const [form, setForm] = useState(defaultForm);
  const { locations } = useLocationStore();

  useEffect(() => {
    if (hall) {
      setForm({
        name: hall.name || "",
        location: hall.location || "",
        capacity: hall.capacity || "",
        basePrice: hall.basePrice || "",
        status: hall.status || "active",
        description: hall.description || "",
      });
    } else {
      setForm(defaultForm);
    }
  }, [hall, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave?.({
      ...form,
      capacity: Number(form.capacity || 0),
      basePrice: Number(form.basePrice || 0),
    });
  };

  return (
    <Drawer
      isOpen={isOpen}
      title={mode === "edit" ? "Edit Hall" : "Add Hall"}
      onClose={onClose}
      width="w-[460px]"
    >
      <form onSubmit={handleSubmit} className="p-5 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hall Name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="h-12 w-full rounded-xl border border-gray-300 px-4"
            placeholder="Enter hall name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <select
            name="location"
            value={form.location}
            onChange={handleChange}
            className="h-12 w-full rounded-xl border border-gray-300 px-4 bg-white"
            required
          >
            <option value="">Select Location</option>
            {locations.map((location) => (
              <option key={location.id} value={location.name}>
                {location.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Capacity
            </label>
            <input
              type="number"
              name="capacity"
              value={form.capacity}
              onChange={handleChange}
              className="h-12 w-full rounded-xl border border-gray-300 px-4"
              placeholder="e.g. 300"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Base Price
            </label>
            <input
              type="number"
              name="basePrice"
              value={form.basePrice}
              onChange={handleChange}
              className="h-12 w-full rounded-xl border border-gray-300 px-4"
              placeholder="e.g. 50000"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="h-12 w-full rounded-xl border border-gray-300 px-4 bg-white"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full rounded-xl border border-gray-300 px-4 py-3"
            placeholder="Short hall description"
          />
        </div>

        <div className="sticky bottom-0 bg-white pt-3">
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={onClose}
              className="h-12 rounded-xl border border-gray-300 bg-white font-medium hover:bg-gray-50"
            >
              Close
            </button>

            <button
              type="submit"
              className="h-12 rounded-xl bg-primary text-white font-medium hover:opacity-95"
            >
              {mode === "edit" ? "Update Hall" : "Save Hall"}
            </button>
          </div>
        </div>
      </form>
    </Drawer>
  );
}

export default HallDrawer;