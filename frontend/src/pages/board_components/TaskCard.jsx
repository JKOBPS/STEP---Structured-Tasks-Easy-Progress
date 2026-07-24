import { DeleteIcon, EditIcon } from "../../components/atoms/svg/Icons";

export const TaskCard = ({ task, onClick, onDelete, canEdit }) => {
  const priorityColors = {
    HIGH: "bg-red-100 text-red-700",
    MEDIUM: "bg-amber-100 text-amber-700",
    LOW: "bg-emerald-100 text-emerald-700",
    DEFAULT: "bg-slate-100 text-slate-600",
  };

  const priorityStyle =
    priorityColors[task?.priority] || priorityColors.DEFAULT;
  const progressValue = task?.percentage || 0;

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete(task);
  };

  return (
    <div
      onClick={() => onClick(task)}
      className="group relative flex cursor-pointer flex-col gap-3 rounded-lg border border-slate-200 bg-white p-3 shadow-sm transition-all hover:border-blue-400 hover:shadow-md"
    >
      {/* Botón de Eliminar */}
      {canEdit && (
        <>
          <button
            onClick={handleDeleteClick}
            className="absolute right-2 top-2 rounded p-1 text-slate-400 hover:bg-red-50 hover:text-red-500 cursor-pointer group-hover:block transition-colors"
            title="Eliminar tarea"
          >
            <DeleteIcon className="w-4 h-4" />
          </button>
        </>
      )}

      {/* Prioridad y Menú oculto */}
      <div className="flex items-center justify-between">
        <span
          className={`w-fit rounded text-[10px] font-bold uppercase px-2 py-0.5 ${priorityStyle}`}
        >
          {task?.priority || "NORMAL"}
        </span>

        <button className="opacity-0 transition-opacity text-slate-400 hover:text-slate-600 group-hover:opacity-100"></button>
      </div>

      {/* Título y Descripción */}
      <div>
        <h4 className="font-medium leading-tight text-slate-800 line-clamp-2">
          {task?.title || "Sin título"}
        </h4>
        {task?.description && (
          <p className="mt-1 text-xs text-slate-500 line-clamp-2">
            {task.description}
          </p>
        )}
      </div>

      {/* Barra de Progreso Visual */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between text-[10px] font-semibold text-slate-500">
          <span>Progreso</span>
          <span>{progressValue}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className={`h-full rounded-full transition-all duration-500 ${progressValue === 100 ? "bg-emerald-500" : "bg-blue-500"}`}
            style={{ width: `${progressValue}%` }}
          ></div>
        </div>
      </div>

      {/* Footer: Fecha y Asignado */}
      <div className="mt-1 flex items-center justify-between border-t border-slate-100 pt-2">
        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
          <span>📅</span>
          <span>
            {task?.dueDate
              ? new Date(task.dueDate).toLocaleDateString()
              : "--/--/----"}
          </span>
        </div>

        {/* Avatar */}
        {task?.assignedTo && (
          <div
            className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 text-[10px] font-bold text-white ring-2 ring-white"
            title={`Asignado a: ${task.assignedTo}`}
          >
            {task.assignedTo.substring(0, 2).toUpperCase()}
          </div>
        )}
      </div>
    </div>
  );
};
