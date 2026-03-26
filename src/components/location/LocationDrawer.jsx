import { useEffect, useState } from "react";
import Drawer from "../ui/Drawer";

const defaultForm = {
  name: "",
  address: "",
  phone: "",
  managerName: "",
  managerEmail: "",
  status: "active",
  notes: "",
};

function LocationDrawer({
  isOpen,
  location,
  mode = "create",
  onClose,
  onSave,
}) {
  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    if (location) {
      setForm({
        name: location.name || "",
        address: location.address || "",
        phone: location.phone || "",
        managerName: location.managerName || "",
        managerEmail: location.managerEmail || "",
        status: location.status || "active",
        notes: location.notes || "",
      });
    } else {
      setForm(defaultForm);
    }
  }, [location, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave?.(form);
  };

  return (
    <Drawer
      isOpen={isOpen}
      title={mode === "edit" ? "Edit Location" : "Add Location"}
      onClose={onClose}
      width="w-[480px]"
    >
      <form onSubmit={handleSubmit} className="p-5 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location Name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="h-12 w-full rounded-xl border border-gray-300 px-4"
            placeholder="Enter location name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address
          </label>
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            rows={3}
            className="w-full rounded-xl border border-gray-300 px-4 py-3"
            placeholder="Enter address"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone
          </label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="h-12 w-full rounded-xl border border-gray-300 px-4"
            placeholder="Enter contact number"
            required
          />
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Manager Name
            </label>
            <input
              type="text"
              name="managerName"
              value={form.managerName}
              onChange={handleChange}
              className="h-12 w-full rounded-xl border border-gray-300 px-4"
              placeholder="Enter manager name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Manager Email
            </label>
            <input
              type="email"
              name="managerEmail"
              value={form.managerEmail}
              onChange={handleChange}
              className="h-12 w-full rounded-xl border border-gray-300 px-4"
              placeholder="Enter manager email"
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
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notes
          </label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            rows={4}
            className="w-full rounded-xl border border-gray-300 px-4 py-3"
            placeholder="Additional location notes"
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
              {mode === "edit" ? "Update Location" : "Save Location"}
            </button>
          </div>
        </div>
      </form>
    </Drawer>
  );
}

export default LocationDrawer;