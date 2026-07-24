// src/components/auth/LoginForm.jsx
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
    <div className="w-full max-w-md rounded-2xl border border-slate-100 bg-white p-8 shadow-xl transition-all">
      {/* Cabecera más profesional y acogedora */}
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-extrabold text-slate-900">
          Iniciar Sesión
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Introduce tus credenciales para acceder a STEP
        </p>
      </div>

      {/* Alerta de error mejorada con SVG y colores suaves */}
      {error && (
        <div className="mb-6 flex items-center rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <svg
            className="mr-3 h-5 w-5 shrink-0 text-red-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          <span className="font-medium">{error}</span>
        </div>
      )}

      <form onSubmit={login} className="space-y-5">
        <Input
          label="Usuario"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Nombre de usuario"
          required={true}
        />

        <Input
          label="Contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required={true}
        />

        {/* Separador visual antes del botón para darle aire */}
        <div className="pt-2">
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Comprobando..." : "Entrar al Sistema"}
          </Button>
        </div>
      </form>

      {/* Enlace de cambio a registro más integrado */}
      <div className="mt-8 border-t border-slate-100 pt-6 text-center text-sm text-slate-600">
        ¿No tienes cuenta?{" "}
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="font-semibold text-blue-600 transition-colors hover:text-blue-800 cursor-pointer"
        >
          Regístrate aquí
        </button>
      </div>
    </div>
  );
};
