import axiosClient from "../api/axiosClient";

const invoiceService = {
  getInvoice: async (bookingId) => {
    const response = await axiosClient.get(`/bookings/${bookingId}/invoice`);
    return response.data;
  },

  sendInvoice: async (bookingId) => {
    const response = await axiosClient.post(
      `/bookings/${bookingId}/send-invoice`
    );
    return response.data;
  },
};

export default invoiceService;