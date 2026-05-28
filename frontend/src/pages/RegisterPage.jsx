import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Input } from "../components/atoms/Input";
import { Button } from "../components/atoms/Button";
import { Footer } from "../components/layout/Footer";

export const RegisterPage = () => {
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
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-3xl font-bold text-slate-800">
          Crear Cuenta
        </h2>

        {/* Mensaje de Error */}
        {error && (
          <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-500 border border-red-200">
            {error}
          </div>
        )}

        {/* Mensaje de Éxito */}
        {success && (
          <div className="mb-4 rounded-md bg-green-50 p-3 text-sm text-green-600 border border-green-200">
            ¡Registro exitoso! Redirigiendo al login...
          </div>
        )}

        <form onSubmit={register} className="space-y-4">
          {/* Átomo: Input de Usuario */}
          <Input
            label="Usuario"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required={true}
          />

          {/* Átomo: Input de Email */}
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required={true}
          />

          {/* Átomo: Input de Contraseña */}
          <Input
            label="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required={true}
            placeholder="Mínimo 6 caracteres"
          />

          {/* Átomo: Botón */}
          <Button
            type="submit"
            disabled={loading || success}
            className="bg-green-600 hover:bg-green-700 focus:ring-green-500"
          >
            {loading ? "Registrando..." : "Registrarse"}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-600">
          ¿Ya tienes cuenta?{" "}
          <Link
            to="/login"
            className="font-semibold text-blue-600 hover:underline cursor-pointer"
          >
            Inicia sesión aquí
          </Link>
        </div>
      </div>
    </div>
  );
};
