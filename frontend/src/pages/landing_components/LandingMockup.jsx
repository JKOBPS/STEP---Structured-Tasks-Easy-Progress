// src/components/landing/LandingMockup.jsx
import { TaskCardMockup } from "./TaskCardMockup";
import {
  LightningIcon,
  UsersIcon,
  TargetIcon,
} from "../../components/atoms/svg/Icons";

export const LandingMockup = () => {
  return (
    <div className="flex w-full max-w-md flex-col items-center space-y-8">
      {/* 1. Logotipo y Textos (Hero) */}
      <div className="space-y-4 text-center">
        <h1 className="text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl">
          Organiza, colabora y conquista.
        </h1>
        <p className="px-4 text-sm text-slate-600">
          El espacio donde tu equipo anota avances, gestiona tareas y mantiene
          todo bajo control en un solo lugar.
        </p>
      </div>

      {/* 2. Área del Mockup Dinámico */}
      <div className="relative flex w-full flex-col items-center justify-center rounded-2xl bg-linear-to-tr from-slate-100 to-slate-200 p-8 shadow-inner overflow-hidden">
        {/* Tarjeta 1: Fondo */}
        <div className="floating-slow w-full flex justify-center">
          <TaskCardMockup
            title="Diseñar arquitectura de BBDD"
            statusText="Completado"
            statusColor="bg-green-100 text-green-700"
            extraClasses="-rotate-3 scale-95 opacity-80"
          />
        </div>

        {/* Tarjeta 2: Centro*/}
        <div className="floating-fast w-full flex justify-center z-10 mt-2">
          <TaskCardMockup
            title="Implementar sistema de Login"
            statusText="En progreso"
            statusColor="bg-blue-100 text-blue-700"
            extraClasses="z-10 -mt-6 rotate-2 scale-105 shadow-2xl"
          />
        </div>

        {/* Tarjeta 3: Frente*/}
        <div className="floating-medium w-full flex justify-center z-20 mt-2">
          <TaskCardMockup
            title="Crear Landing Page móvil"
            statusText="Pendiente"
            statusColor="bg-amber-100 text-amber-700"
            extraClasses="z-20 -mt-6 -rotate-1 shadow-lg"
          />
        </div>
      </div>

      {/* 3. Beneficios Rápidos */}
      <div className="flex w-full justify-around pt-4">
        <div className="flex flex-col items-center text-center group">
          <div className="mb-2 rounded-lg bg-blue-50 p-2 text-blue-600 transition-colors group-hover:bg-blue-100">
            <LightningIcon className="w-6 h-6" />
          </div>
          <span className="text-xs font-semibold text-slate-700">Rápido</span>
        </div>

        <div className="flex flex-col items-center text-center group">
          <div className="mb-2 rounded-lg bg-blue-50 p-2 text-blue-600 transition-colors group-hover:bg-blue-100">
            <UsersIcon className="w-6 h-6" />
          </div>
          <span className="text-xs font-semibold text-slate-700">
            Colaborativo
          </span>
        </div>

        <div className="flex flex-col items-center text-center group">
          <div className="mb-2 rounded-lg bg-blue-50 p-2 text-blue-600 transition-colors group-hover:bg-blue-100">
            <TargetIcon className="w-6 h-6" />
          </div>
          <span className="text-xs font-semibold text-slate-700">
            Organizado
          </span>
        </div>
      </div>
    </div>
  );
};
