import { api } from "./api";
const PAGE_SIZE = 12;

export const getUserProjects = async (
  searchTerm = "",
  page = 0,
  role = "ALL",
  sort = "createdAt,desc",
) => {
  let url = `/projects/search`;
  if (searchTerm.trim() !== "") {
    url += `/name/${searchTerm}`;
  }

  url += `?page=${page}&size=${PAGE_SIZE}&sort=${sort}&role=${role}`;

  const response = await api.get(url);
  return response.data;
};

export const getProjectById = async (projectId) => {
  const response = await api.get(`/projects/search/${projectId}`);
  return response.data;
};

export const createProject = async (projectData) => {
  const response = await api.post("/projects/create", projectData);
  return response.data;
};

export const updateProject = async (projectId, projectData) => {
  const response = await api.put(`/projects/update/${projectId}`, projectData);
  return response.data;
};

export const deleteProject = async (projectId) => {
  const response = await api.delete(`/projects/delete/${projectId}`);
  return response.data;
};
