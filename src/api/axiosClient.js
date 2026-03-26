import axios from "axios";
import { API_BASE_URL } from "../config/env";

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

axiosClient.interceptors.request.use(
  (config) => {
    const authStorage = localStorage.getItem("banquet-auth");

    if (authStorage) {
      try {
        const parsed = JSON.parse(authStorage);
        const token = parsed?.state?.token;

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error("Failed to parse auth storage:", error);
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        localStorage.removeItem("banquet-auth");

        if (window.location.pathname !== "/") {
          window.location.href = "/";
        }
      }

      return Promise.reject({
        status,
        ...(error.response.data || {}),
        message:
          error.response.data?.message ||
          error.response.data?.error ||
          "Request failed",
      });
    }

    return Promise.reject({
      message: error.message || "Network error occurred",
    });
  }
);

export default axiosClient;