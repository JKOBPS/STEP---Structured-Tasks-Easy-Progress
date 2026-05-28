import { useState } from "react";

export const MembersSidebar = ({
  memberships = [],
  currentUserRole,
  currentUserId,
  isGlobalAdmin = false,
  onEditRole,
  onRemoveMember,
  onAddMember,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMembers = memberships.filter((member) => {
    const name = member.username || `Usuario #${member.userId}`;
    return name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const hasSuperPowers = currentUserRole === "OWNER" || isGlobalAdmin;

  return (
    <aside className="flex h-full w-64 flex-col border-r border-slate-200 bg-white p-4">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-800">Equipo</h2>
        <p className="text-xs text-slate-500">{memberships.length} miembros</p>
      </div>

      {hasSuperPowers && (
        <button
          onClick={onAddMember}
          className="flex shrink-0 my-2 items-center gap-1.5 rounded-lg bg-blue-50 px-2.5 py-1.5 text-xs font-bold text-blue-600 transition-colors hover:bg-blue-100 hover:cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Añadir miembro
        </button>
      )}

      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar miembro..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 outline-none transition-all focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          <svg
            className="absolute right-3 top-2.5 h-4 w-4 text-slate-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2">
        <ul className="flex flex-col gap-3">
          {filteredMembers.length > 0 ? (
            filteredMembers.map((member) => {
              const name = member.username || `Usuario #${member.userId}`;
              const isMe = String(member.userId) === String(currentUserId);

              const roleColor =
                member.role === "OWNER"
                  ? "bg-purple-100 text-purple-700"
                  : member.role === "MEMBER"
                    ? "bg-green-100 text-green-700"
                    : "bg-slate-100 text-slate-600";

              return (
                <li
                  key={member.userId}
                  className="flex items-center justify-between rounded-lg border border-slate-100 p-3 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex flex-col overflow-hidden">
                    <span
                      className="truncate text-sm font-semibold text-slate-700"
                      title={name}
                    >
                      {name} {isMe && "(Tú)"}
                    </span>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-xs text-slate-400">
                        ID: {member.userId}
                      </span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wider ${roleColor}`}
                      >
                        {member.role}
                      </span>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-1">
                    {/* BOTÓN EDITAR ROL */}
                    {hasSuperPowers && !isMe && (
                      <button
                        onClick={() => onEditRole(member)}
                        className="rounded p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-blue-600 cursor-pointer"
                        title="Editar rol"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 20h9"></path>
                          <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path>
                        </svg>
                      </button>
                    )}

                    {/* BOTÓN EXPULSAR */}
                    {hasSuperPowers && !isMe && (
                      <button
                        onClick={() => onRemoveMember(member)}
                        className="rounded p-1.5 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600 cursor-pointer"
                        title="Expulsar del proyecto"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M3 6h18"></path>
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                          <line x1="10" y1="11" x2="10" y2="17"></line>
                          <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                      </button>
                    )}
                  </div>
                </li>
              );
            })
          ) : (
            <div className="mt-4 text-center text-sm text-slate-500">
              No se encontraron usuarios.
            </div>
          )}
        </ul>
      </div>
    </aside>
  );
};
