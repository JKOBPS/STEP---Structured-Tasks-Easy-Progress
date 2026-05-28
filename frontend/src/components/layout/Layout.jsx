// src/components/Layout.jsx
import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export const Layout = () => {
  return (
    // flexbox del layout general
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* navbar fijo en rutas privadas */}
      <Navbar />

      {/* estilos que permiten al footer abajo del todo */}
      <main className="flex-1 pt-16">
        <Outlet />
      </main>

      {/* footer fijo en rutas privadas */}
      <Footer />
    </div>
  );
};
