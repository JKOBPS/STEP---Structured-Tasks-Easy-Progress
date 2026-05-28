import { useState, useEffect, useCallback } from "react";
import { getUserProjects } from "../services/projectAPI";

export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  const fetchProjects = useCallback(
    async (
      searchTerm = "",
      pageNum = 0,
      role = "ALL",
      sort = "createdAt,desc",
    ) => {
      try {
        if (pageNum === 0) setLoading(true);
        else setLoadingMore(true);
        setError("");

        const data = await getUserProjects(searchTerm, pageNum, role, sort);
        const newProjects = data?.content || [];

        if (pageNum === 0) {
          setProjects(newProjects);
        } else {
          setProjects((prevProjects) => [...prevProjects, ...newProjects]);
        }

        setCurrentPage(pageNum);
        setHasMore(!data.last);
      } catch (err) {
        console.error("Error al obtener proyectos:", err);
        setError("No se pudieron cargar los proyectos.");
        if (pageNum === 0) setProjects([]);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [],
  );

  // Carga inicial
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return {
    projects,
    loading,
    loadingMore,
    error,
    hasMore,
    currentPage,
    fetchProjects,
  };
};
