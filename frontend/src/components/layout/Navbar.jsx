import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();

  // constante que obtiene del localstore el nombre de usuario ¿JWT name?
  const userName = localStorage.getItem("user_name") || "Usuario";

  // constante, "objeto" con atributos en su interior, usa una api que segun el nombre te genera un avatar con iniciales. Devuelve un <img>
  const user = {
    name: userName,
    avatar: `https://ui-avatars.com/api/?name=${userName}&background=0D8ABC&color=fff&rounded=true`,
  };

  // Funcion que llamándola, borra item del localstore y te navega al endpoint login
  const handleLogout = () => {
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("user_name");
    navigate("/login");
  };

  return (
    <nav className="fixed left-0 top-0 z-50 flex w-full h-16 items-center justify-between border-b border-slate-200 bg-white px-6 shadow-sm">
      {/*SECCIÓN IZQUIERDA: Logo y Nombre de la App */}
      <div className="flex items-center gap-3">
        {/*SVG Personalizado de STEP */}
        <Link
          to="/dashboard"
          className="flex items-center gap-2 cursor-pointer"
        >
          <img
            src="/step-favicon.svg"
            alt="StepApp Logo"
            to="/dashboard"
            className="h-8 w-8 transition-transform hover:scale-105 cursor-pointer"
          />
        </Link>
        <Link
          to="/dashboard"
          className="text-xl font-bold hover:scale-105 tracking-tight text-slate-800 hover:text-blue-600 cursor-pointer"
        >
          StepApp
        </Link>
      </div>

      {/* SECCIÓN DERECHA: Usuario y Controles */}
      <div className="flex items-center gap-4">
        {/* Zona del Usuario*/}
        <button
          type="button"
          className="flex items-center gap-2 rounded-lg p-1.5 transition-colors "
          title="Opciones de usuario"
        >
          <img
            src={user.avatar}
            alt={`Avatar de ${user.name}`}
            className="h-8 w-8 rounded-full shadow-sm"
          />
          <span className="hidden text-sm font-medium text-slate-700 sm:block">
            {user.name}
          </span>
        </button>

        {/* Separador visual elegante */}
        <div className="h-6 w-px bg-slate-300"></div>

        {/* Botón de Salir */}
        <button
          onClick={handleLogout}
          className="rounded-md px-3 py-1.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 hover:text-red-700 cursor-pointer"
        >
          Salir
        </button>
      </div>
    </nav>
  );
};
