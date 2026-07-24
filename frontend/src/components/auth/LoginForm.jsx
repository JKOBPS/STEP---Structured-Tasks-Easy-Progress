import { Link } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
import { Input } from "../atoms/Input";
import { Button } from "../atoms/Button";

export const LoginForm = ({ onSwitchToRegister }) => {
  const {
    username,
    setUsername,
    password,
    setPassword,
    loading,
    error,
    login,
  } = useAuth();

  return (
    <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
      <h1 className="mb-6 text-center text-2xl font-bold text-slate-800">
        Iniciar Sesión
      </h1>

      {/* Si hay un error, mostramos un cartelito rojo */}
      {error && (
        <div className="mb-4 rounded bg-red-50 p-3 text-sm text-red-600 border border-red-200">
          {error}
        </div>
      )}

      <form onSubmit={login} className="space-y-4">
        {/* Usamos component */}
        <Input
          label="Usuario"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Nombre de usuario"
          required={true}
        />

        {/* Input personalizado */}
        <Input
          label="Contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required={true}
        />

        {/*Button Component */}
        <Button type="submit" disabled={loading}>
          {loading ? "Comprobando credenciales..." : "Entrar al Sistema"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600">
        ¿No tienes cuenta?{" "}
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="font-semibold text-blue-600 hover:underline cursor-pointer bd-transparent border-none p-0"
        >
          Regístrate aquí
        </button>
      </p>
    </div>
  );
};
