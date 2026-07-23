// src/services/api.js
import axios from "axios";

export const api = axios.create({
  //Variable de entorno encontrarla en Vercel
  baseURL: import.meta.env.VITE_API_URL,
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
