import axios from "axios";

const baseURL = import.meta.env.VITE_APP_API_URL || "http://localhost:5000"; // fallback for development
const API = axios.create({ baseURL });

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
