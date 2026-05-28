import { useState, useEffect } from "react";
import { Modal } from "../shared/Modal";
import { Input } from "../atoms/Input";
import { Button } from "../atoms/Button";
import { createProject, updateProject } from "../../services/projectAPI";

export const ProjectFormModal = ({
  isOpen,
  onClose,
  onSuccess,
  projectData = null,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isEditing = Boolean(projectData);
  const title = isEditing ? "Editar Proyecto" : "Crear Nuevo Proyecto";
  const buttonText = isEditing ? "Guardar Cambios" : "Crear Proyecto";

  useEffect(() => {
    if (isOpen) {
      setName(projectData?.name || "");
      setDescription(projectData?.description || "");
      setError("");
    }
  }, [isOpen, projectData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isEditing) {
        // Modo Edición (PUT)
        await updateProject(projectData.projectId, { name, description });
      } else {
        // Modo Creación (POST)
        await createProject({ name, description });
      }

      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      setError(
        isEditing ? "Error al actualizar." : "Error al crear el proyecto.",
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
          label="Nombre del proyecto"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ej: Rediseño de App Móvil"
          required={true}
          maxLength={100}
        />

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-slate-700">
            Descripción (Opcional)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="¿De qué trata este proyecto?"
            rows={3}
            className="w-full resize-none rounded-lg border border-slate-300 p-2.5 outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            maxLength={255}
          />
        </div>

        <div className="mt-4 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100 cursor-pointer"
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
