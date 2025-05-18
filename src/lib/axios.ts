import axios from "axios";
import { auth } from "@/services/firebase";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
});

// Add a request interceptor to automatically add the auth token
axiosInstance.interceptors.request.use(
  async (config) => {
    // Get the current user
    const user = auth.currentUser;

    // If user is authenticated, get their token and add it to headers
    if (user) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
