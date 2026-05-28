import { api } from "./api";

export const getColumnsByProject = async (projectId) => {
  const response = await api.get(`/columns/search/project/${projectId}`);

  return response.data.content || response.data;
};

// CREATE
export const createColumn = async (columnData) => {
  const response = await api.post(`/columns/create`, columnData);
  return response.data;
};

// UPDATE
export const updateColumn = async (columnId, columnData) => {
  const response = await api.put(`/columns/update/${columnId}`, columnData);
  return response.data;
};

// DELETE
export const deleteColumn = async (columnId) => {
  const response = await api.delete(`/columns/delete/${columnId}`);
  return response.data;
};
