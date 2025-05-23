import axios from "axios";

const API = axios.create({
  baseURL: "http://192.168.1.49:5187/api"
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
