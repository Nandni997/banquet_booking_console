import axiosClient from "../api/axiosClient";

const locationService = {
  getAll: async (params = {}) => {
    const response = await axiosClient.get("/locations", { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await axiosClient.get(`/locations/${id}`);
    return response.data;
  },

  create: async (payload) => {
    const response = await axiosClient.post("/locations", payload);
    return response.data;
  },

  update: async (id, payload) => {
    const response = await axiosClient.put(`/locations/${id}`, payload);
    return response.data;
  },
};

export default locationService;