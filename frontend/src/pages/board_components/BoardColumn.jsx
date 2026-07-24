import { TaskCard } from "./TaskCard";
import { DeleteIcon, EditIcon } from "../../components/atoms/svg/Icons";

export const BoardColumn = ({
  column,
  tasks = [],
  onEdit,
  onDelete,
  onTaskClick,
  onCreateTask,
  onDeleteTask,
  canEdit,
}) => {
  return (
    <div className="flex h-full w-80 shrink-0 flex-col rounded-xl bg-slate-100/80 p-3 shadow-sm">
      <div className="group mb-3 flex items-center justify-between px-1">
        <h3 className="font-semibold text-slate-700">{column.name}</h3>

        <div className="flex items-center gap-2">
          <div className="flex ">
            {canEdit && (
              <>
                <button
                  onClick={() => onEdit(column)}
                  className="cursor-pointer rounded p-1 text-slate-400 hover:bg-blue-50 hover:text-blue-600"
                  title="Editar columna"
                >
                  <EditIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(column)}
                  className="cursor-pointer rounded p-1 text-slate-400 hover:bg-red-50 hover:text-red-600"
                  title="Borrar columna"
                >
                  <DeleteIcon className="w-4 h-4" />
                </button>
              </>
            )}
          </div>

          <span className="flex h-5 w-15 items-center justify-center rounded-full bg-slate-200 text-xs font-medium text-slate-600">
            {tasks.length} Tareas
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 overflow-y-auto pb-2 pr-1">
        {tasks.map((task) => (
          <TaskCard
            key={task.id || task.taskId}
            task={task}
            onClick={() => onTaskClick(task)}
            onDelete={() => onDeleteTask(task)}
            canEdit={canEdit}
          />
        ))}

        {canEdit && (
          <>
            <button
              onClick={() => onCreateTask(column.columnId)}
              className="mt-1 flex w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-slate-200 bg-transparent py-2 text-sm font-medium text-slate-500 transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700"
            >
              + Añadir tarea
            </button>
          </>
        )}
      </div>
    </div>
  );
};
