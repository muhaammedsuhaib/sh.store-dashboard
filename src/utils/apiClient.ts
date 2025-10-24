import axios, {
  type AxiosInstance,
  type AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";
import { API_URL, clearLoginToken, getLoginToken } from "./helper";

// ----------------- Private Axios Instance ----------------- //
const APIClientPrivate: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// 🔥 Add a request interceptor to dynamically attach the latest token
APIClientPrivate.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = getLoginToken(); // Always fetch the latest token

    // Ensure headers object exists
    config.headers = config.headers ?? {};

    if (token) {
      // Type-safe assignment for Axios v1+
      (
        config.headers as Record<string, string>
      ).Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// 🚨 Global response handler for 401 Unauthorized
APIClientPrivate.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      clearLoginToken(); 
    }
    return Promise.reject(error);
  }
);

// ----------------- Public Axios Instance ----------------- //
export const APIClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  // withCredentials: true, // uncomment if needed
});

// ----------------- Export ----------------- //
export default APIClientPrivate;
