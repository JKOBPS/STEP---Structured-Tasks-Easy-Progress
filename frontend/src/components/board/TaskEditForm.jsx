import { useState, useEffect } from "react";
import { Input } from "../atoms/Input";
import { Textarea } from "../atoms/TextArea";
import { Select } from "../atoms/Select";
import { Button } from "../atoms/Button";
import { createTask, updateTask } from "../../services/taskAPI";

export const TaskEditForm = ({
  taskData,
  columns = [],
  memberships = [],
  initialColumnId = "",
  onClose,
  onSuccess,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [dueDate, setDueDate] = useState("");
  const [percentage, setPercentage] = useState(0);
  const [assignedToColumnId, setAssignedToColumnId] = useState("");
  const [assignedToUserId, setAssignedToUserId] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isEditing = Boolean(taskData);

  useEffect(() => {
    if (isEditing) {
      setTitle(taskData.title || "");
      setDescription(taskData.description || "");
      setPriority(taskData.priority || "MEDIUM");
      setDueDate(taskData.dueDate ? taskData.dueDate.split("T")[0] : "");
      setPercentage(taskData.percentage || 0);
      setAssignedToColumnId(
        String(taskData.assignedToColumnId || taskData.columnId || ""),
      );
      setAssignedToUserId(
        taskData.assignedToUserId ? String(taskData.assignedToUserId) : "",
      );
    } else {
      setTitle("");
      setDescription("");
      setPriority("MEDIUM");
      setDueDate("");
      setPercentage(0);
      if (initialColumnId) {
        setAssignedToColumnId(String(initialColumnId));
      } else if (columns.length > 0) {
        setAssignedToColumnId(String(columns[0].columnId || columns[0].id));
      } else {
        setAssignedToColumnId("");
      }
      setAssignedToUserId("");
    }
    setError("");
  }, [taskData, columns, isEditing, initialColumnId]);

  const priorityOptions = [
    { label: "🔴 Alta", value: "HIGH" },
    { label: "🟡 Media", value: "MEDIUM" },
    { label: "🟢 Baja", value: "LOW" },
  ];

  const columnOptions = columns.map((col) => ({
    label: col.name,
    value: String(col.columnId),
  }));

  const memberOptions = memberships
    .filter((member) => member.role !== "VIEWER")
    .map((member) => {
      const name = member.username || `Usuario #${member.userId}`;
      const roleText = member.role ? ` (${member.role})` : "";
      return {
        label: roleText === " (OWNER)" ? `${name}${roleText}` : `${name}`,
        value: String(member.userId || member.id),
      };
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const payload = {
      title,
      description: description || null,
      priority,
      dueDate: dueDate || null,
      percentage: Number(percentage),
      assignedToColumnId: Number(assignedToColumnId),
      assignedToUserId: assignedToUserId ? Number(assignedToUserId) : null,
    };

    try {
      if (isEditing) {
        await updateTask(taskData.taskId || taskData.id, payload);
      } else {
        await createTask(payload);
      }
      onSuccess();
      onClose();
    } catch (err) {
      setError(
        isEditing
          ? "Error al actualizar la tarea."
          : "Error al crear la tarea.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 border border-red-200">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Título de la tarea"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Ej: Integrar pasarela de pago..."
        />

        <Textarea
          label="Descripción (Opcional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Añade más detalles sobre esta tarea..."
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Select
            label="Estado (Columna)"
            options={columnOptions}
            value={assignedToColumnId}
            onChange={(e) => setAssignedToColumnId(e.target.value)}
            required
          />
          <Select
            label="Prioridad"
            options={priorityOptions}
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Select
            label="Asignar a"
            options={memberOptions}
            value={assignedToUserId}
            onChange={(e) => setAssignedToUserId(e.target.value)}
            placeholder="Sin asignar"
          />
          <Input
            label="Fecha límite"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <div className="w-1/2">
          <Input
            label={`Progreso (${percentage}%)`}
            type="number"
            min="0"
            max="100"
            value={percentage}
            onChange={(e) => setPercentage(e.target.value)}
          />
        </div>

        <div className="mt-4 flex justify-end gap-3 border-t border-slate-100 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100"
          >
            Cancelar
          </button>
          <div className="w-auto">
            <Button
              type="submit"
              disabled={loading || !title.trim() || !assignedToColumnId}
            >
              {loading ? "Guardar..." : "Guardar Tarea"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
