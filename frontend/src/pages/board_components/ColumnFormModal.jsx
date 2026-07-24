import { useState, useEffect } from "react";
import { Modal } from "../../components/shared/Modal";
import { Input } from "../../components/atoms/Input";
import { Button } from "../../components/atoms/Button";
import { createColumn, updateColumn } from "../../services/columnAPI";

export const ColumnFormModal = ({
  isOpen,
  onClose,
  onSuccess,
  columnData = null,
  projectId,
}) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isEditing = Boolean(columnData);
  const title = isEditing ? "Editar Columna" : "Nueva Columna";
  const buttonText = isEditing ? "Guardar" : "Crear";

  useEffect(() => {
    if (isOpen) {
      setName(columnData?.name || "");
      setError("");
    }
  }, [isOpen, columnData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isEditing) {
        await updateColumn(columnData.columnId, {
          name,
          projectId: Number(projectId),
        });
      } else {
        await createColumn({ name, projectId: Number(projectId) });
      }
      onSuccess();
      onClose();
    } catch (err) {
      setError(
        isEditing ? "Error al actualizar." : "Error al crear la columna.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 border border-red-200">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Nombre de la columna"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ej: En Progreso, Tareas Pendientes..."
          required={true}
          maxLength={50}
        />

        <div className="mt-4 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
          >
            Cancelar
          </button>
          <div className="w-auto">
            <Button type="submit" disabled={loading || !name.trim()}>
              {loading ? "Procesando..." : buttonText}
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};
