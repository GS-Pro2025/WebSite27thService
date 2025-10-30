import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
  withCredentials: false,
});

// Log para debug
api.interceptors.request.use((config) => {
  console.log(` Making request to: ${config.baseURL}${config.url}`);
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log(`Response received:`, response.data);
    return response;
  },
  (error) => {
    console.error(`Request failed:`, error?.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
