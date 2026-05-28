// src/services/api.js
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

//Interceptor de peticiones
api.interceptors.request.use(
  (config) => {
    //busca token en la caja fuerte del navegador
    const token = localStorage.getItem("jwt_token");

    // Si hay token, lo pega a la cabecera "Authorization"
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
