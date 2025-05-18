import axios from "axios";
import { auth } from "@/services/firebase";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
});

axiosInstance.interceptors.request.use(
  async (config) => {
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
