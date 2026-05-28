import { useState } from "react";
import { loginUser, registerUser } from "../services/authAPI";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  // 1. Las variables para el backend
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 2. Estados de la interfaz
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  // --- LÓGICA DE LOGIN ---
  const login = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Por favor, rellena todos los campos.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const data = await loginUser(username, password);

      if (data.token) {
        localStorage.setItem("jwt_token", data.token);
        localStorage.setItem("user_name", username);
        localStorage.setItem("user_id", data.userId);
      }

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Usuario o contraseña incorrectos.");
    } finally {
      setLoading(false);
    }
  };

  // --- LÓGICA DE REGISTRO  ---
  const register = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await registerUser({ username, email, password });

      setSuccess(true);

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error(err);
      if (err.response?.data) {
        setError(
          "Error al registrar. Revisa los datos o prueba con otro usuario/email.",
        );
      } else {
        setError("Problema de conexión con el servidor.");
      }
    } finally {
      setLoading(false);
    }
  };

  //Guardo un nuevo objeto user en el localstore, para poder recogerlo en otros componentes.
  const storedUserId = localStorage.getItem("user_id");
  const storedUserName = localStorage.getItem("user_name");
  const user = storedUserId
    ? {
        id: storedUserId,
        username: storedUserName,
      }
    : null;

  return {
    user,
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    success,
    login,
    register,
  };
};
