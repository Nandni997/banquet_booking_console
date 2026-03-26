import { create } from "zustand";
import bookingService from "../services/bookingService";

const useBookingStore = create((set, get) => ({
  bookings: [],
  selectedBooking: null,
  isLoading: false,
  isSaving: false,
  error: null,

  fetchBookings: async (params = {}) => {
    set({ isLoading: true, error: null });

    try {
      const response = await bookingService.getAll(params);

      const bookings =
        response?.data ||
        response?.bookings ||
        response ||
        [];

      set({
        bookings: Array.isArray(bookings) ? bookings : [],
        isLoading: false,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error?.message || "Failed to fetch bookings",
      });
    }
  },

  fetchBookingById: async (bookingId) => {
    set({ isLoading: true, error: null });

    try {
      const response = await bookingService.getById(bookingId);

      const booking =
        response?.data ||
        response?.booking ||
        response ||
        null;

      set({
        selectedBooking: booking,
        isLoading: false,
      });

      return booking;
    } catch (error) {
      set({
        isLoading: false,
        error: error?.message || "Failed to fetch booking details",
      });
      return null;
    }
  },

  addBooking: async (payload) => {
    set({ isSaving: true, error: null });

    try {
      const response = await bookingService.create(payload);

      const newBooking =
        response?.data ||
        response?.booking ||
        response;

      set((state) => ({
        bookings: newBooking ? [...state.bookings, newBooking] : state.bookings,
        isSaving: false,
      }));

      return { success: true, data: newBooking };
    } catch (error) {
      set({
        isSaving: false,
        error: error?.message || "Failed to create booking",
      });

      return {
        success: false,
        error: error?.message || "Failed to create booking",
      };
    }
  },

  updateBooking: async (bookingId, payload) => {
    set({ isSaving: true, error: null });

    try {
      const response = await bookingService.update(bookingId, payload);

      const updatedBooking =
        response?.data ||
        response?.booking ||
        response;

      set((state) => ({
        bookings: state.bookings.map((booking) =>
          booking.id === bookingId
            ? {
                ...booking,
                ...(updatedBooking || payload),
                id: bookingId,
              }
            : booking
        ),
        selectedBooking:
          state.selectedBooking?.id === bookingId
            ? {
                ...state.selectedBooking,
                ...(updatedBooking || payload),
                id: bookingId,
              }
            : state.selectedBooking,
        isSaving: false,
      }));

      return { success: true, data: updatedBooking };
    } catch (error) {
      set({
        isSaving: false,
        error: error?.message || "Failed to update booking",
      });

      return {
        success: false,
        error: error?.message || "Failed to update booking",
      };
    }
  },

  cancelBooking: async (bookingId) => {
    set({ isSaving: true, error: null });

    try {
      const response = await bookingService.cancel(bookingId);

      const cancelledBooking =
        response?.data ||
        response?.booking ||
        response;

      set((state) => ({
        bookings: state.bookings.map((booking) =>
          booking.id === bookingId
            ? {
                ...booking,
                ...(cancelledBooking || {}),
                status: cancelledBooking?.status || "cancelled",
              }
            : booking
        ),
        selectedBooking:
          state.selectedBooking?.id === bookingId
            ? {
                ...state.selectedBooking,
                ...(cancelledBooking || {}),
                status: cancelledBooking?.status || "cancelled",
              }
            : state.selectedBooking,
        isSaving: false,
      }));

      return { success: true, data: cancelledBooking };
    } catch (error) {
      set({
        isSaving: false,
        error: error?.message || "Failed to cancel booking",
      });

      return {
        success: false,
        error: error?.message || "Failed to cancel booking",
      };
    }
  },

  confirmBooking: async (bookingId) => {
    set({ isSaving: true, error: null });

    try {
      await bookingService.confirm(bookingId);

      set((state) => ({
        bookings: state.bookings.map((b) =>
          Number(b.id) === Number(bookingId)
            ? { ...b, status: "confirmed" }
            : b
        ),
        isSaving: false,
      }));

      return { success: true };
    } catch (error) {
      set({
        isSaving: false,
        error: error?.message || "Failed to confirm booking",
      });

      return { success: false };
    }
  },

  completeBooking: async (bookingId) => {
    set({ isSaving: true, error: null });

    try {
      await bookingService.complete(bookingId);

      set((state) => ({
        bookings: state.bookings.map((b) =>
          Number(b.id) === Number(bookingId)
            ? { ...b, status: "completed" }
            : b
        ),
        isSaving: false,
      }));

      return { success: true };
    } catch (error) {
      set({
        isSaving: false,
        error: error?.message || "Failed to complete booking",
      });

      return { success: false };
    }
  },

  setBookings: (bookings) => set({ bookings }),
  setSelectedBooking: (booking) => set({ selectedBooking: booking }),
  clearSelectedBooking: () => set({ selectedBooking: null }),
  clearError: () => set({ error: null }),
}));

export default useBookingStore;