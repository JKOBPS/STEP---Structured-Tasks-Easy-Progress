// src/components/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";

/**
 * Componente que protege las rutas privadas.
 * Verifica si el usuario tiene una sesión activa (token) antes de renderizar el contenido.
 */
export const ProtectedRoute = () => {
  // Buscamos el "Pase VIP" en la memoria del navegador
  const token = localStorage.getItem("jwt_token");

  // Si no hay token, redirigimos inmediatamente al login.
  // El atributo "replace" borra el historial para que el usuario no pueda
  // darle al botón "Atrás" y volver a intentar entrar al dashboard.
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Si hay token, <Outlet /> renderiza la ruta hija que el usuario estaba intentando visitar
  return <Outlet />;
};
