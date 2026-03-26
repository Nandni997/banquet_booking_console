import { useEffect, useState } from "react";
import Drawer from "../ui/Drawer";

const defaultForm = {
  name: "",
  phone: "",
  email: "",
  address: "",
  notes: "",
};

function CustomerDrawer({ isOpen, customer, mode = "create", onClose, onSave }) {
  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    if (customer) {
      setForm({
        name: customer.name || "",
        phone: customer.phone || "",
        email: customer.email || "",
        address: customer.address || "",
        notes: customer.notes || "",
      });
    } else {
      setForm(defaultForm);
    }
  }, [customer, isOpen]);

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
      title={mode === "edit" ? "Edit Customer" : "Add Customer"}
      onClose={onClose}
      width="w-[460px]"
    >
      <form onSubmit={handleSubmit} className="p-5 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Customer Name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="h-12 w-full rounded-xl border border-gray-300 px-4"
            placeholder="Enter customer name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="h-12 w-full rounded-xl border border-gray-300 px-4"
            placeholder="Enter phone number"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="h-12 w-full rounded-xl border border-gray-300 px-4"
            placeholder="Enter email"
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
          />
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
            placeholder="Special notes about this customer"
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
              {mode === "edit" ? "Update Customer" : "Save Customer"}
            </button>
          </div>
        </div>
      </form>
    </Drawer>
  );
}

export default CustomerDrawer;