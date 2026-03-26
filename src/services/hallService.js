import axiosClient from "../api/axiosClient";

const hallService = {
  getAll: async (params = {}) => {
    const response = await axiosClient.get("/halls", { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await axiosClient.get(`/halls/${id}`);
    return response.data;
  },

  create: async (payload) => {
    const response = await axiosClient.post("/halls", payload);
    return response.data;
  },

  update: async (id, payload) => {
    const response = await axiosClient.put(`/halls/${id}`, payload);
    return response.data;
  },

  getAvailability: async (date) => {
    const response = await axiosClient.get("/halls/available", {
      params: { date },
    });
    return response.data;
  },
};

export default hallService;