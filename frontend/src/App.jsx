// src/App.jsx
import { Navigate, Route, Routes } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { LoginForm } from "./components/auth/LoginForm";
import { RegisterForm } from "./components/auth/RegisterForm";
import { DashboardPage } from "./pages/DashBoardPage";
import { BoardPage } from "./pages/BoardPage";
import { Layout } from "./components/layout/Layout";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/*RUTAS PÚBLICAS (Sin restricciones)*/}
      <Route path="/" element={<Navigate to="/landing" replace />} />
      <Route path="/landing" element={<LandingPage />} />

      {/*RUTAS PRIVADAS (Protegidas)*/}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/project/:projectId" element={<BoardPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
