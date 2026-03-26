import axiosClient from "../api/axiosClient";

const calendarService = {
  // Example: /calendar?month=2026-06
  getCalendar: async (params = {}) => {
    const response = await axiosClient.get("/calendar", { params });
    return response.data;
  },
};

export default calendarService;