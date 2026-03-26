import axiosClient from "../api/axiosClient";

const customerService = {
  getAll: async (params = {}) => {
    const response = await axiosClient.get("/customers", { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await axiosClient.get(`/customers/${id}`);
    return response.data;
  },

  create: async (payload) => {
    const response = await axiosClient.post("/customers", payload);
    return response.data;
  },

  update: async (id, payload) => {
    const response = await axiosClient.put(`/customers/${id}`, payload);
    return response.data;
  },
};

export default customerService;