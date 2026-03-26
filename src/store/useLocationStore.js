import { create } from "zustand";
import locationService from "../services/locationService";

const useLocationStore = create((set) => ({
  locations: [],
  isLoading: false,
  isSaving: false,
  error: null,

  fetchLocations: async (params = {}) => {
    set({ isLoading: true, error: null });

    try {
      const response = await locationService.getAll(params);

      const locations =
        response?.data ||
        response?.locations ||
        response ||
        [];

      set({
        locations: Array.isArray(locations) ? locations : [],
        isLoading: false,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error?.message || "Failed to fetch locations",
      });
    }
  },

  addLocation: async (payload) => {
    set({ isSaving: true, error: null });

    try {
      const response = await locationService.create(payload);

      const newLocation =
        response?.data ||
        response?.location ||
        response;

      set((state) => ({
        locations: newLocation
          ? [newLocation, ...state.locations]
          : state.locations,
        isSaving: false,
      }));

      return { success: true, data: newLocation };
    } catch (error) {
      set({
        isSaving: false,
        error: error?.message || "Failed to create location",
      });

      return {
        success: false,
        error: error?.message || "Failed to create location",
      };
    }
  },

  updateLocation: async (locationId, payload) => {
    set({ isSaving: true, error: null });

    try {
      const response = await locationService.update(locationId, payload);

      const updatedLocation =
        response?.data ||
        response?.location ||
        response;

      set((state) => ({
        locations: state.locations.map((location) =>
          location.id === locationId
            ? {
                ...location,
                ...(updatedLocation || payload),
                id: locationId,
              }
            : location
        ),
        isSaving: false,
      }));

      return { success: true, data: updatedLocation };
    } catch (error) {
      set({
        isSaving: false,
        error: error?.message || "Failed to update location",
      });

      return {
        success: false,
        error: error?.message || "Failed to update location",
      };
    }
  },

  setLocations: (locations) => set({ locations }),
  clearError: () => set({ error: null }),
}));

export default useLocationStore;