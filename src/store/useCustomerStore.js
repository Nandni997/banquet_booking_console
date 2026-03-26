import { create } from "zustand";
import customerService from "../services/customerService";

const useCustomerStore = create((set) => ({
  customers: [],
  isLoading: false,
  isSaving: false,
  error: null,

  fetchCustomers: async (params = {}) => {
    set({ isLoading: true, error: null });

    try {
      const response = await customerService.getAll(params);

      const customers =
        response?.data ||
        response?.customers ||
        response ||
        [];

      set({
        customers: Array.isArray(customers) ? customers : [],
        isLoading: false,
      });

      return customers;
    } catch (error) {
      set({
        isLoading: false,
        error: error?.message || "Failed to fetch customers",
      });

      return [];
    }
  },

  fetchCustomerById: async (customerId) => {
    set({ isLoading: true, error: null });

    try {
      const response = await customerService.getById(customerId);

      const customer =
        response?.data ||
        response?.customer ||
        response ||
        null;

      set({ isLoading: false });
      return customer;
    } catch (error) {
      set({
        isLoading: false,
        error: error?.message || "Failed to fetch customer",
      });

      return null;
    }
  },

  addCustomer: async (payload) => {
    set({ isSaving: true, error: null });

    try {
      const response = await customerService.create(payload);

      const newCustomer =
        response?.data ||
        response?.customer ||
        response;

      set((state) => ({
        customers: newCustomer
          ? [newCustomer, ...state.customers]
          : state.customers,
        isSaving: false,
      }));

      return { success: true, data: newCustomer };
    } catch (error) {
      set({
        isSaving: false,
        error: error?.message || "Failed to create customer",
      });

      return {
        success: false,
        error: error?.message || "Failed to create customer",
      };
    }
  },

  updateCustomer: async (customerId, payload) => {
    set({ isSaving: true, error: null });

    try {
      const response = await customerService.update(customerId, payload);

      const updatedCustomer =
        response?.data ||
        response?.customer ||
        response;

      set((state) => ({
        customers: state.customers.map((customer) =>
          Number(customer.id) === Number(customerId)
            ? {
                ...customer,
                ...(updatedCustomer || payload),
                id: customerId,
              }
            : customer
        ),
        isSaving: false,
      }));

      return { success: true, data: updatedCustomer };
    } catch (error) {
      set({
        isSaving: false,
        error: error?.message || "Failed to update customer",
      });

      return {
        success: false,
        error: error?.message || "Failed to update customer",
      };
    }
  },

  setCustomers: (customers) => set({ customers }),
  clearError: () => set({ error: null }),
}));

export default useCustomerStore;