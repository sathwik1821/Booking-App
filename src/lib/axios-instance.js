import axios from "axios";
import { getToken, setToken, removeToken } from './auth';

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  withCredentials: true,
});

// Request Interceptor: Attach JWT access token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Automatically unwrap Spring ApiResponse<T>
axiosInstance.interceptors.response.use(
  (response) => {
    // If response is wrapped in Spring Boot ApiResponse { data, error, timeStamp }
    if (response.data && typeof response.data === 'object' && response.data.data !== undefined && response.data.error === null) {
      response.data = response.data.data;
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Do NOT intercept 401 on any auth endpoint (login, signup, refresh)
    if (!originalRequest || originalRequest.url?.includes('/auth/')) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await axios.post("http://localhost:8080/api/v1/auth/refresh", {}, { withCredentials: true });
        const raw = response.data?.data || response.data;
        const accessToken = raw?.accessToken || raw;

        if (accessToken && typeof accessToken === 'string' && accessToken !== 'undefined') {
          setToken(accessToken);
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshErr) {
        removeToken();
        window.dispatchEvent(new CustomEvent('auth:logout'));
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
