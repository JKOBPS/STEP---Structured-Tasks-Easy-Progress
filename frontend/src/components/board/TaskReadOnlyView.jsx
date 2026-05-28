export const TaskReadOnlyView = ({
  taskData,
  columns = [],
  memberships = [],
  onClose,
  onEditClick,
  canEdit,
}) => {
  const selectedColumnName =
    columns.find(
      (c) =>
        String(c.columnId || c.id) ===
        String(taskData?.assignedToColumnId || taskData?.columnId),
    )?.name || "Sin columna";

  const selectedUserName =
    memberships.find(
      (m) => String(m.userId) === String(taskData?.assignedToUserId),
    )?.username || "Sin asignar";

  return (
    <div className="flex flex-col gap-5 py-2">
      {/* Título */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Título
        </h4>
        <p className="mt-1 text-lg font-medium text-slate-800">
          {taskData?.title}
        </p>
      </div>

      {/* Descripción */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Descripción
        </h4>
        <div className="mt-1 whitespace-pre-wrap text-sm text-slate-600">
          {taskData?.description || (
            <span className="italic text-slate-400">
              Sin descripción proporcionada.
            </span>
          )}
        </div>
      </div>

      {/* Cuadrícula de metadatos (2 columnas) */}
      <div className="grid grid-cols-2 gap-4 rounded-lg bg-slate-50 p-4">
        <div>
          <h4 className="text-xs font-semibold uppercase text-slate-400">
            Columna
          </h4>
          <p className="mt-1 text-sm font-medium text-slate-700">
            {selectedColumnName}
          </p>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase text-slate-400">
            Asignado a
          </h4>
          <p className="mt-1 text-sm font-medium text-slate-700">
            {selectedUserName}
          </p>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase text-slate-400">
            Prioridad
          </h4>
          <p className="mt-1 text-sm font-medium text-slate-700">
            {taskData?.priority}
          </p>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase text-slate-400">
            Vencimiento
          </h4>
          <p className="mt-1 text-sm font-medium text-slate-700">
            {taskData?.dueDate ? taskData.dueDate.split("T")[0] : "-"}
          </p>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase text-slate-400">
            Progreso
          </h4>
          <p className="mt-1 text-sm font-medium text-slate-700">
            {taskData?.percentage || 0}%
          </p>
        </div>
      </div>

      {/* Botonera inferior */}
      <div className="mt-6 flex justify-end gap-3 border-t border-slate-100 pt-4">
        <button
          onClick={onClose}
          className="rounded-md bg-slate-100 px-4 py-2 font-medium text-slate-600 transition-colors hover:bg-slate-200 cursor-pointer"
        >
          Cerrar
        </button>

        {/* Botón condicionado: Solo lo ven si canEdit es true */}
        {canEdit && (
          <button
            onClick={onEditClick}
            className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
            Editar Tarea
          </button>
        )}
      </div>
    </div>
  );
};
