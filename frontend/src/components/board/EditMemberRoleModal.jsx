import { useState, useEffect } from "react";
import { Modal } from "../shared/Modal";
import { Select } from "../atoms/Select";
import { Button } from "../atoms/Button";

export const EditMemberRoleModal = ({
  isOpen,
  onClose,
  member,
  onConfirm,
  loading,
}) => {
  const [role, setRole] = useState("MEMBER");
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    if (isOpen && member) {
      setRole(member.role || "MEMBER");
      setShowWarning(false);
    }
  }, [isOpen, member]);

  const roleOptions = [
    { label: "Dueño - Ceder propiedad del proyecto", value: "OWNER" },
    { label: "Miembro - Puede editar tareas", value: "MEMBER" },
    { label: "Visualizador - Solo lectura", value: "VIEWER" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (role === "OWNER" && !showWarning && member?.role !== "OWNER") {
      setShowWarning(true);
      return;
    }
    onConfirm(member.userId, role);
  };

  const handleClose = () => {
    setShowWarning(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={`Editar rol de ${member?.username}`}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {!showWarning ? (
          <>
            <p className="text-sm text-slate-500">
              Selecciona el nuevo nivel de permisos para este usuario en el
              proyecto.
            </p>

            <Select
              label="Rol del proyecto"
              options={roleOptions}
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </>
        ) : (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <h4 className="mb-2 flex items-center gap-2 font-bold text-red-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                <path d="M12 9v4"></path>
                <path d="M12 17h.01"></path>
              </svg>
              Transferencia de Propiedad
            </h4>
            <p className="text-sm text-red-600">
              Estás a punto de convertir a <strong>{member?.username}</strong>{" "}
              en el Dueño absoluto del proyecto.
            </p>
            <p className="mt-2 text-sm text-red-600">
              El proyecto solo puede tener un Dueño. Si confirmas esta acción,{" "}
              <strong>
                el dueño actual será degradado a miembro normal automáticamente
              </strong>
              . ¿Estás seguro de realizar este cambio?
            </p>
          </div>
        )}

        <div className="mt-4 flex justify-end gap-3 border-t border-slate-100 pt-4">
          <button
            type="button"
            onClick={showWarning ? () => setShowWarning(false) : handleClose}
            className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100 cursor-pointer"
          >
            Cancelar
          </button>

          <div className="w-auto">
            {showWarning ? (
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-50"
              >
                {loading ? "Transfiriendo..." : "Sí, confirmar dueño"}
              </button>
            ) : (
              <Button type="submit" disabled={loading}>
                {loading ? "Actualizando..." : "Guardar Cambios"}
              </Button>
            )}
          </div>
        </div>
      </form>
    </Modal>
  );
};
