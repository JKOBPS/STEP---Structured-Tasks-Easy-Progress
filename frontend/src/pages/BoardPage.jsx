import { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { getColumnsByProject, deleteColumn } from "../services/columnAPI";
import { getTasksByProject, deleteTask } from "../services/taskAPI";
import {
  getProjectMemberships,
  updateMemberRole,
  removeProjectMember,
} from "../services/membershipAPI";
import { AddMemberModal } from "./board_components/AddMemberModal";
import { getProjectById, updateProject } from "../services/projectAPI";
import { BoardColumn } from "./board_components/BoardColumn";
import { Button } from "../components/atoms/Button";
import { useAuth } from "../hooks/useAuth";
import { MembersSidebar } from "./board_components/MembersSidebar";
import { EditMemberRoleModal } from "./board_components/EditMemberRoleModal";

import { ColumnFormModal } from "./board_components/ColumnFormModal";
import { ConfirmModal } from "../components/shared/ConfirmModal";
import { TaskFormModal } from "./board_components/TaskFormModal";

export const BoardPage = () => {
  //Constantes/parámetros
  const { projectId } = useParams();

  const [columns, setColumns] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [memberships, setMemberships] = useState([]);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditRoleModalOpen, setIsEditRoleModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [roleLoading, setRoleLoading] = useState(false);

  // ESTADOS PARA EXPULSAR MIEMBRO
  const [isRemoveMemberModalOpen, setIsRemoveMemberModalOpen] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState(null);
  const [isRemovingMember, setIsRemovingMember] = useState(false);
  // ESTADOS PARA AÑADIR MIEMBRO
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [isAddingMember, setIsAddingMember] = useState(false);
  const handleConfirmAddMember = async (newUserId) => {
    setIsAddingMember(true);
    try {
      const payload = {
        name: project.name,
        description: project.description || "Sin descripción",
        members: [...memberships.map((m) => m.userId), Number(newUserId)],

        columns: columns.map((c) => c.columnId || c.id),
      };

      await updateProject(projectId, payload);

      await fetchBoardData();
      setIsAddMemberModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Error al añadir miembro. Revisa que el ID sea correcto.");
    } finally {
      setIsAddingMember(false);
    }
  };

  //estados para formularios
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  //columnas
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [defaultColumnId, setDefaultColumnId] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [isDeleteTaskModalOpen, setIsDeleteTaskModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [isDeletingTask, setIsDeletingTask] = useState(false);

  //VER SI EL USUARIO ES VIEWER PARA RESTRINGIR ACCIONES
  const { user } = useAuth();
  const currentUserMembership = memberships.find(
    (m) => String(m.userId) === String(user?.id),
  );
  const isViewer = currentUserMembership?.role === "VIEWER";
  const canEdit = !isViewer;
  const currentUserRole = currentUserMembership?.role || "VIEWER";

  const fetchBoardData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [columnsData, tasksData, membershipsData, projectData] =
        await Promise.all([
          getColumnsByProject(projectId),
          getTasksByProject(projectId),
          getProjectMemberships(projectId),
          getProjectById(projectId),
        ]);

      setColumns(columnsData);
      setTasks(tasksData);
      setMemberships(membershipsData);
      setProject(projectData);
    } catch (err) {
      console.error("Error al cargar el tablero:", err);
      setError("No se pudo cargar la información del proyecto.");
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    if (projectId) {
      fetchBoardData();
    }
  }, [projectId, fetchBoardData]);

  //column
  const handleOpenCreate = () => {
    setSelectedColumn(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (column) => {
    setSelectedColumn(column);
    setIsFormOpen(true);
  };

  const handleOpenDelete = (column) => {
    setSelectedColumn(column);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      setActionLoading(true);
      const idToBorrar = selectedColumn.columnId || selectedColumn.id;
      await deleteColumn(idToBorrar);
      setIsDeleteModalOpen(false);
      fetchBoardData();
    } catch (err) {
      alert("Error al borrar la columna");
    } finally {
      setActionLoading(false);
    }
  };

  //task
  const handleOpenCreateTask = (columnId) => {
    setSelectedTask(null);
    setDefaultColumnId(columnId);
    setIsTaskFormOpen(true);
  };
  const handleOpenEditTask = (task) => {
    setSelectedTask(task);
    setIsTaskFormOpen(true);
  };
  const handleOpenDeleteTask = (task) => {
    setTaskToDelete(task);
    setIsDeleteTaskModalOpen(true);
  };
  const handleConfirmDeleteTask = async () => {
    try {
      setIsDeletingTask(true);
      await deleteTask(taskToDelete.taskId);
      setIsDeleteTaskModalOpen(false);
      fetchBoardData();
    } catch (err) {
      alert("Error al borrar la tarea");
    } finally {
      setIsDeletingTask(false);
    }
  };

  //members
  const handleOpenEditRole = (member) => {
    setSelectedMember(member);
    setIsEditRoleModalOpen(true);
  };

  const handleUpdateRole = async (userId, newRole) => {
    setRoleLoading(true);
    try {
      await updateMemberRole(projectId, userId, newRole);
      await fetchBoardData();
      setIsEditRoleModalOpen(false);
    } catch (err) {
      alert("Error al actualizar el rol.");
    } finally {
      setRoleLoading(false);
    }
  };

  const handleOpenRemoveMember = (member) => {
    setMemberToRemove(member);
    setIsRemoveMemberModalOpen(true);
  };

  const handleConfirmRemoveMember = async () => {
    setIsRemovingMember(true);
    try {
      await removeProjectMember(projectId, memberToRemove.userId);
      await fetchBoardData();
      setIsRemoveMemberModalOpen(false);
    } catch (err) {
      alert("Error al expulsar al miembro del proyecto.");
    } finally {
      setIsRemovingMember(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-64px)] items-center justify-center bg-slate-50">
        <p className="text-lg font-medium animate-pulse text-slate-500">
          Cargando tablero...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] gap-4 bg-slate-50">
        <div className="rounded-lg bg-red-50 p-4 text-red-600 border border-red-200">
          {error}
        </div>
        <Link
          to="/dashboard"
          className="text-blue-600 hover:underline font-medium cursor-pointer"
        >
          ← Volver a Mis Proyectos
        </Link>
      </div>
    );
  }

  // return principal del tablero

  return (
    // 1. CONTENEDOR PRINCIPAL:
    <div className="flex h-[calc(100vh-64px)] w-full flex-col overflow-hidden bg-slate-50">
      {/* 2. CABECERA FULL WIDTH */}
      <header className="relative z-10 flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center gap-4">
          <Link
            to="/dashboard"
            className="text-slate-400 transition-colors hover:text-slate-600 cursor-pointer"
          >
            ← Volver
          </Link>
          <div className="h-6 w-px bg-slate-200"></div>
          <h1 className="text-xl font-bold text-slate-800">{project.name}</h1>
        </div>

        <div className="flex items-center gap-3">
          {canEdit && (
            <Button onClick={handleOpenCreate}>+ Añadir Columna</Button>
          )}
        </div>
      </header>

      {/* 3. ZONA INFERIOR DIVIDIDA */}
      <div className="flex flex-1 overflow-hidden">
        {/* MENÚ LATERAL */}
        <MembersSidebar
          memberships={memberships}
          currentUserRole={currentUserRole}
          currentUserId={user?.id || user?.userId}
          isGlobalAdmin={user?.globalRole === "ADMIN"}
          onEditRole={handleOpenEditRole}
          onRemoveMember={handleOpenRemoveMember}
          onAddMember={() => setIsAddMemberModalOpen(true)}
        />

        {/* TABLERO KANBAN */}
        <main className="flex-1 overflow-x-auto p-6">
          <div className="flex h-full items-start gap-6">
            {columns.length === 0 ? (
              <div className="flex h-32 w-full items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-100/50">
                <p className="text-sm font-medium text-slate-500">
                  Este proyecto aún no tiene columnas. ¡Añade la primera!
                </p>
              </div>
            ) : (
              columns.map((col) => {
                const columnId = col.columnId;
                const columnTasks = tasks.filter(
                  (t) =>
                    t.assignedToColumnId === columnId ||
                    t.columnId === columnId,
                );

                return (
                  <BoardColumn
                    key={columnId}
                    column={col}
                    tasks={columnTasks}
                    onEdit={handleOpenEdit}
                    onDelete={handleOpenDelete}
                    onTaskClick={handleOpenEditTask}
                    onCreateTask={handleOpenCreateTask}
                    onDeleteTask={handleOpenDeleteTask}
                    canEdit={canEdit}
                  />
                );
              })
            )}
          </div>
        </main>
      </div>

      {/* MODALES */}
      <ColumnFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        columnData={selectedColumn}
        projectId={projectId}
        onSuccess={fetchBoardData}
      />

      {/* Eliminar columna */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Eliminar Columna"
        message={`¿Estás seguro de que quieres eliminar la columna "${selectedColumn?.name}"? Se borrarán todas las tareas que contenga.`}
        confirmText="Sí, eliminar"
        isLoading={actionLoading}
      />

      {/* Eliminar tarea */}
      <ConfirmModal
        isOpen={isDeleteTaskModalOpen}
        onClose={() => setIsDeleteTaskModalOpen(false)}
        onConfirm={handleConfirmDeleteTask}
        title="Eliminar Tarea"
        message={`¿Estás seguro de que quieres eliminar la tarea "${taskToDelete?.title}"? Esta acción no se puede deshacer.`}
        confirmText="Sí, eliminar"
        isLoading={isDeletingTask}
      />

      {/* expulsar miembro de proyecto */}
      <ConfirmModal
        isOpen={isRemoveMemberModalOpen}
        onClose={() => setIsRemoveMemberModalOpen(false)}
        onConfirm={handleConfirmRemoveMember}
        title="Expulsar Miembro"
        message={`¿Estás seguro de que quieres expulsar a "${memberToRemove?.username}" del proyecto? Perderá acceso inmediatamente a todas las tareas y columnas.`}
        confirmText="Sí, expulsar"
        isLoading={isRemovingMember}
      />
      {/* añadir miembro al proyecto */}
      <AddMemberModal
        isOpen={isAddMemberModalOpen}
        onClose={() => setIsAddMemberModalOpen(false)}
        onConfirm={handleConfirmAddMember}
        loading={isAddingMember}
        existingMemberIds={memberships.map((m) => m.userId)}
      />

      <TaskFormModal
        isOpen={isTaskFormOpen}
        onClose={() => setIsTaskFormOpen(false)}
        taskData={selectedTask}
        columns={columns}
        memberships={memberships}
        initialColumnId={defaultColumnId}
        onSuccess={fetchBoardData}
        canEdit={canEdit}
      />

      <EditMemberRoleModal
        isOpen={isEditRoleModalOpen}
        onClose={() => setIsEditRoleModalOpen(false)}
        member={selectedMember}
        onConfirm={handleUpdateRole}
        loading={roleLoading}
      />
    </div>
  );
};
