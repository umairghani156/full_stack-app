import axios, {AxiosError } from "axios";
import toast from "react-hot-toast";

// Create an instance of Axios
const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Don't manually set content-type if using FormData
    if (config.data instanceof FormData && config.headers) {
      delete config.headers["Content-Type"];
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const responseData = error.response.data as { message?: string };

      if (responseData?.message === "Token expired. Please log in again.") {
        toast.error(responseData.message);

        localStorage.removeItem("token");
        localStorage.removeItem("user");

       

       
      }
    }

    return Promise.reject(error);
  }
);

export default api;
