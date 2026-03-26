import axiosClient from "../api/axiosClient";

const dashboardService = {
  getStats: async () => {
    const response = await axiosClient.get("/dashboard/stats");
    return response.data;
  },

  // Already partially used in bookingService but good to centralize
  getBookingSummary: async () => {
    const response = await axiosClient.get("/bookings/summary");
    return response.data;
  },
};

export default dashboardService;