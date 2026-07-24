// src/components/landing/TaskCardMockup.jsx
import { UserAvatarIcon } from "../../components/atoms/svg/Icons";

export const TaskCardMockup = ({
  title,
  statusText,
  statusColor,
  extraClasses = "",
}) => {
  return (
    <div
      className={`w-64 rounded-xl border border-slate-100 bg-white p-4 shadow-xl transition-transform duration-300 ${extraClasses}`}
    >
      <div className="mb-2 flex items-center justify-between">
        <span
          className={`rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${statusColor}`}
        >
          {statusText}
        </span>
        <div className="flex space-x-1">
          <div className="h-1 w-1 rounded-full bg-slate-300"></div>
          <div className="h-1 w-1 rounded-full bg-slate-300"></div>
          <div className="h-1 w-1 rounded-full bg-slate-300"></div>
        </div>
      </div>

      <h3 className="mb-3 text-sm font-semibold text-slate-800">{title}</h3>

      {/* Avatares de los miembros del equipo, mockup */}
      <div className="flex items-center justify-between border-t border-slate-50 pt-3">
        <div className="flex -space-x-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-blue-500 text-white">
            <UserAvatarIcon className="h-3.5 w-3.5" />
          </div>
          <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-purple-500 text-white">
            <UserAvatarIcon className="h-3.5 w-3.5" />
          </div>
        </div>

        {/* Barra de progreso */}
        <div className="h-1.5 w-12 rounded-full bg-slate-100">
          <div className="h-1.5 w-2/3 rounded-full bg-blue-500"></div>
        </div>
      </div>
    </div>
  );
};
