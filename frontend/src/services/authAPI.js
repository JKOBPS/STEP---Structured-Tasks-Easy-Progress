// src/services/authAPI.js
import { api } from "./api";

/**
 * Servicio exclusivo para las llamadas relacionadas con la autenticación.
 * * @param {string} username - Nombre de usuario
 * @param {string} password - Contraseña del usuario
 * @returns {Promise<Object>} La respuesta de tu backend ( token JWT)
 */
export const loginUser = async (username, password) => {
  // POST a http://localhost:8080/auth/login
  const response = await api.post("/auth/login", {
    username: username,
    password: password,
  });

  return response.data;
};

/**
 * Servicio para registrar un nuevo usuario.
 * @param {Object} userData - Objeto con los datos del usuario (nombre, username, password)
 */
export const registerUser = async (userData) => {
  //POST a http://localhost:8080/auth/register
  const response = await api.post("/auth/register", userData);

  return response.data;
};
