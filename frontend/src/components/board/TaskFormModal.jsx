import { useState, useEffect } from "react";
import { Modal } from "../shared/Modal";
import { TaskReadOnlyView } from "./TaskReadOnlyView";
import { TaskEditForm } from "./TaskEditForm";

export const TaskFormModal = ({
  isOpen,
  onClose,
  onSuccess,
  taskData = null,
  columns = [],
  memberships = [],
  initialColumnId = "",
  canEdit,
}) => {
  // Si hay taskData (estamos editando/viendo), empezamos en modo lectura.
  // Si taskData es null (estamos creando), vamos directo al formulario (isViewMode = false).
  const [isViewMode, setIsViewMode] = useState(Boolean(taskData));

  useEffect(() => {
    if (isOpen) {
      setIsViewMode(Boolean(taskData));
    }
  }, [isOpen, taskData]);

  const handleEditClick = () => {
    setIsViewMode(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        isViewMode
          ? "Detalles de la Tarea"
          : taskData
            ? "Ver/Editar Tarea"
            : "Nueva Tarea"
      }
    >
      {isViewMode ? (
        <TaskReadOnlyView
          taskData={taskData}
          columns={columns}
          memberships={memberships}
          onClose={onClose}
          onEditClick={handleEditClick}
          canEdit={canEdit}
        />
      ) : (
        <TaskEditForm
          taskData={taskData}
          columns={columns}
          memberships={memberships}
          initialColumnId={initialColumnId}
          onClose={onClose}
          onSuccess={onSuccess}
        />
      )}
    </Modal>
  );
};
