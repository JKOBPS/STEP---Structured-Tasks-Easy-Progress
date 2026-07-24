import { Link } from "react-router-dom";
import { EditIcon, DeleteIcon } from "../atoms/svg/Icons";
import { UsersIcon } from "../atoms/svg/Icons";

const ROLE_COLORS = {
  OWNER: "bg-amber-100 text-amber-800 border border-amber-200",
  MEMBER: "bg-blue-100 text-blue-700 border border-blue-200",
  VIEWER: "bg-slate-100 text-slate-600 border border-slate-200",
  DEFAULT: "bg-slate-100 text-slate-700 border border-slate-200",
};

export const ProjectCard = ({ project, onEdit, onDelete }) => {
  const totalMembers = project.memberships?.length || 0;

  const myUserId = Number(localStorage.getItem("user_id"));
  const myMembership = project.memberships?.find((m) => m.userId === myUserId);
  const displayRole = myMembership?.role || "MEMBER";
  const roleStyle = ROLE_COLORS[displayRole] || ROLE_COLORS.DEFAULT;

  const isOwner = displayRole === "OWNER";

  return (
    <div className="group flex h-full flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span
            className={`w-fit rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${roleStyle}`}
          >
            {displayRole}
          </span>

          <div className="relative flex items-center justify-end h-8 min-w-15">
            <span
              className={`text-xs font-medium text-slate-400 transition-opacity duration-200 ${isOwner ? "group-hover:opacity-0" : ""}`}
            >
              ID: {project.projectId}
            </span>

            {isOwner && (
              <div className="absolute right-0 flex gap-1 bg-white pl-2">
                <button
                  onClick={() => onEdit(project)}
                  className="cursor-pointer rounded p-1 text-slate-400 transition-colors hover:bg-blue-50 hover:text-blue-600"
                  title="Editar proyecto"
                >
                  <EditIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(project)}
                  className="cursor-pointer rounded p-1 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600"
                  title="Borrar proyecto"
                >
                  <DeleteIcon className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        <h3 className="mt-1 text-lg font-bold leading-tight text-slate-800 wrap-break-word">
          {project.name}
        </h3>

        <p className="text-sm text-slate-600 wrap-break-word line-clamp-2">
          {project.description || "Sin descripción"}
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-sm text-slate-500">
        <div className="flex items-center gap-1.5 font-medium">
          <span>
            <UsersIcon className="w-4 h-4" />
          </span>
          <span>
            {totalMembers} {totalMembers === 1 ? "miembro" : "miembros"}
          </span>
        </div>

        <Link
          to={`/project/${project.projectId}`}
          className="rounded-lg px-2 py-1 font-semibold text-blue-600 transition-colors hover:bg-blue-50"
        >
          Ver tablero →
        </Link>
      </div>
    </div>
  );
};
