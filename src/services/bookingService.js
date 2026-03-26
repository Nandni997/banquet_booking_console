import axiosClient from "../api/axiosClient";

const bookingService = {
  getAll: async (params = {}) => {
    const response = await axiosClient.get("/bookings", { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await axiosClient.get(`/bookings/${id}`);
    return response.data;
  },

  create: async (payload) => {
    const response = await axiosClient.post("/bookings", payload);
    return response.data;
  },

  update: async (id, payload) => {
    const response = await axiosClient.put(`/bookings/${id}`, payload);
    return response.data;
  },

  // FIXED: backend uses POST, not PATCH
  cancel: async (id) => {
    const response = await axiosClient.post(`/bookings/${id}/cancel`);
    return response.data;
  },

  getSummary: async (id) => {
    const response = await axiosClient.get(`/bookings/${id}/summary`);
    return response.data;
  },

  confirm: async (id) => {
    const response = await axiosClient.post(`/bookings/${id}/confirm`);
    return response.data;
  },

  complete: async (id) => {
    const response = await axiosClient.post(`/bookings/${id}/complete`);
    return response.data;
  },

};

export default bookingService;