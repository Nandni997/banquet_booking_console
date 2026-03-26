import { create } from "zustand";
import hallService from "../services/hallService";

const useHallStore = create((set) => ({
  halls: [],
  isLoading: false,
  isSaving: false,
  error: null,

  fetchHalls: async (params = {}) => {
    set({ isLoading: true, error: null });

    try {
      const response = await hallService.getAll(params);

      const halls =
        response?.data ||
        response?.halls ||
        response ||
        [];

      set({
        halls: Array.isArray(halls) ? halls : [],
        isLoading: false,
      });

      return halls;
    } catch (error) {
      set({
        isLoading: false,
        error: error?.message || "Failed to fetch halls",
      });

      return [];
    }
  },

  addHall: async (payload) => {
    set({ isSaving: true, error: null });

    try {
      const response = await hallService.create(payload);

      const newHall =
        response?.data ||
        response?.hall ||
        response;

      set((state) => ({
        halls: newHall ? [newHall, ...state.halls] : state.halls,
        isSaving: false,
      }));

      return { success: true, data: newHall };
    } catch (error) {
      set({
        isSaving: false,
        error: error?.message || "Failed to create hall",
      });

      return {
        success: false,
        error: error?.message || "Failed to create hall",
      };
    }
  },

  updateHall: async (hallId, payload) => {
    set({ isSaving: true, error: null });

    try {
      const response = await hallService.update(hallId, payload);

      const updatedHall =
        response?.data ||
        response?.hall ||
        response;

      set((state) => ({
        halls: state.halls.map((hall) =>
          Number(hall.id) === Number(hallId)
            ? {
                ...hall,
                ...(updatedHall || payload),
                id: hallId,
              }
            : hall
        ),
        isSaving: false,
      }));

      return { success: true, data: updatedHall };
    } catch (error) {
      set({
        isSaving: false,
        error: error?.message || "Failed to update hall",
      });

      return {
        success: false,
        error: error?.message || "Failed to update hall",
      };
    }
  },

  setHalls: (halls) => set({ halls }),
  clearError: () => set({ error: null }),
}));

export default useHallStore;