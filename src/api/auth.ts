import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5187/api", // Адрес твоего .NET API
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = (email: string, password: string) =>
  API.post("/auth/login", { email, password });

export const getMe = () => API.get("/auth/me");
