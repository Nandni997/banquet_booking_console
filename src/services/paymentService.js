import axiosClient from "../api/axiosClient";

const paymentService = {
  create: async (payload) => {
    const response = await axiosClient.post("/payments", payload);
    return response.data;
  },

  getByBookingId: async (bookingId) => {
    const response = await axiosClient.get(`/payments/${bookingId}`);
    return response.data;
  },
};

export default paymentService;