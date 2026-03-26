import axiosClient from "../api/axiosClient";

const authService = {
  login: async (payload) => {
    const response = await axiosClient.post("/login", payload);
    return response.data;
  },

  logout: async () => {
    const response = await axiosClient.post("/logout");
    return response.data;
  },

  me: async () => {
    const response = await axiosClient.get("/me");
    return response.data;
  },
};

export default authService;