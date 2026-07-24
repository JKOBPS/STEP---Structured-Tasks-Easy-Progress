// src/components/auth/RegisterForm.jsx
import { useAuth } from "../../hooks/useAuth";
import { Input } from "../atoms/Input";
import { Button } from "../atoms/Button";

export const RegisterForm = ({ onSwitchToLogin }) => {
  const {
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    success,
    register,
  } = useAuth();

  return (
    <div className="w-full max-w-md rounded-2xl border border-slate-100 bg-white p-8 shadow-xl transition-all">
      {/* Cabecera profesional alineada con el Login */}
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-extrabold text-slate-900">
          Comienza con STEP
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Crea tu cuenta gratis y organiza tu equipo hoy mismo
        </p>
      </div>

      {/* Alerta de Error con SVG */}
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

      {/* Alerta de Éxito con SVG */}
      {success && (
        <div className="mb-6 flex items-center rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700">
          <svg
            className="mr-3 h-5 w-5 shrink-0 text-green-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"
              clipRule="evenodd"
            />
          </svg>
          <span className="font-medium">
            ¡Registro exitoso! Redirigiendo al login...
          </span>
        </div>
      )}

      <form onSubmit={register} className="space-y-5">
        <Input
          label="Usuario"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Tu nombre o apodo"
          required={true}
        />

        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="correo@ejemplo.com"
          required={true}
        />

        <Input
          label="Contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required={true}
          placeholder="Mínimo 6 caracteres"
        />

        {/* Separador visual y botón ajustado */}
        <div className="pt-2">
          <Button
            type="submit"
            disabled={loading || success}
            className="w-full bg-green-600 hover:bg-green-700 focus:ring-green-500"
          >
            {loading ? "Registrando..." : "Crear Cuenta"}
          </Button>
        </div>
      </form>

      {/* Enlace inferior estandarizado */}
      <div className="mt-8 border-t border-slate-100 pt-6 text-center text-sm text-slate-600">
        ¿Ya tienes cuenta?{" "}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="font-semibold text-blue-600 transition-colors hover:text-blue-800 cursor-pointer"
        >
          Inicia Sesión aquí
        </button>
      </div>
    </div>
  );
};
