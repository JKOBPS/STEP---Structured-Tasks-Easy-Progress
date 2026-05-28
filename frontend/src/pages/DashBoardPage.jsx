import { useState, useEffect } from "react";
import { ProjectCard } from "../components/projects/ProjectCard";
import { Button } from "../components/atoms/Button";
import { SearchBar } from "../components/shared/SearchBar";
import { useProjects } from "../hooks/useProjects";
import { FilterBar } from "../components/shared/FilterBar";

import { ProjectFormModal } from "../components/projects/ProjectFormModal";
import { ConfirmModal } from "../components/shared/ConfirmModal";
import { deleteProject } from "../services/projectAPI";

export const DashboardPage = () => {
  const {
    projects,
    loading,
    loadingMore,
    error,
    hasMore,
    currentPage,
    fetchProjects,
  } = useProjects();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("ALL");
  const [sortBy, setSortBy] = useState("createdAt,desc");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProjects(searchTerm, 0, filterRole, sortBy);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm, filterRole, sortBy, fetchProjects]);

  const handleOpenCreate = () => {
    setSelectedProject(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (project) => {
    setSelectedProject(project);
    setIsFormOpen(true);
  };

  const handleOpenDelete = (project) => {
    setSelectedProject(project);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      setActionLoading(true);
      await deleteProject(selectedProject.projectId);
      setIsDeleteModalOpen(false);
      fetchProjects(searchTerm, 0, filterRole, sortBy);
    } catch (err) {
      alert("Error al borrar el proyecto");
    } finally {
      setActionLoading(false);
    }
  };

  const dashboardFilters = [
    {
      id: "roleFilter",
      value: filterRole,
      onChange: setFilterRole,
      options: [
        { label: "Todos los proyectos", value: "ALL" },
        { label: "👑 Owner", value: "OWNER" },
        { label: "👤 Member", value: "MEMBER" },
        { label: "👁️ Viewer", value: "VIEWER" },
      ],
    },
    {
      id: "sortFilter",
      value: sortBy,
      onChange: setSortBy,
      options: [
        { label: "Más recientes", value: "createdAt,desc" },
        { label: "Más antiguos", value: "createdAt,asc" },
        { label: "Nombre (A-Z)", value: "name,asc" },
        { label: "Nombre (Z-A)", value: "name,desc" },
      ],
    },
  ];

  return (
    <div className="mx-auto max-w-7xl p-6 md:p-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Mis Proyectos</h1>
          <p className="mt-1 text-slate-600">
            Gestiona todos tus tableros y equipos de trabajo
          </p>
        </div>

        <div className="w-full sm:w-auto">
          <Button onClick={handleOpenCreate}>Nuevo Proyecto</Button>
        </div>
      </div>

      {/*BARRA DE BUSQUEDA: Buscador + Filtros */}
      <div className="mb-8 flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:flex-row md:items-center">
        <div className="flex-1">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Buscar proyecto por nombre..."
          />
        </div>

        <div className="hidden h-8 w-px bg-slate-200 md:block"></div>

        <FilterBar filters={dashboardFilters} />
      </div>

      {loading ? (
        <div className="flex py-12 justify-center text-slate-500 animate-pulse">
          <p className="text-lg font-semibold">Buscando...</p>
        </div>
      ) : error ? (
        <div className="rounded-lg bg-red-50 p-4 text-red-600 border border-red-200">
          {error}
        </div>
      ) : projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white py-16 text-center">
          <p className="text-lg font-medium text-slate-800">
            No se encontraron proyectos
          </p>
          <p className="mt-1 text-sm text-slate-500">
            {searchTerm
              ? `No hay resultados para "${searchTerm}"`
              : "Aún no tienes proyectos."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-stretch">
          {projects.map((project) => (
            <ProjectCard
              key={project.projectId}
              project={project}
              onEdit={handleOpenEdit}
              onDelete={handleOpenDelete}
            />
          ))}
        </div>
      )}

      {hasMore && !loading && (
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => fetchProjects(searchTerm, currentPage + 1)}
            disabled={loadingMore}
            className="rounded-full border border-slate-300 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:shadow disabled:opacity-70 cursor-pointer"
          >
            {loadingMore ? "Cargando..." : "↓ Cargar más proyectos ↓"}
          </button>
        </div>
      )}

      {/* --- ZONA DE MODALES --- */}

      {/* Modal Unificado (Crear / Editar) */}
      <ProjectFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        projectData={selectedProject}
        onSuccess={() => fetchProjects(searchTerm, 0, filterRole, sortBy)}
      />

      {/* Modal Genérico de Borrado */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Eliminar Proyecto"
        message={`¿Estás seguro de que quieres eliminar el proyecto "${selectedProject?.name}"? Esta acción borrará todas sus columnas y tareas y no se puede deshacer.`}
        confirmText="Sí, eliminar"
        isLoading={actionLoading}
      />
    </div>
  );
};
