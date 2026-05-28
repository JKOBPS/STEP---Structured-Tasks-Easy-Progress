import { api } from "./api";

export const getTasksByProject = async (projectId) => {
  const response = await api.get(`/tasks/search/project/${projectId}`);
  return response.data.content || response.data;
};

// CREATE
export const createTask = async (taskData) => {
  const response = await api.post(`/tasks/create`, taskData);
  return response.data;
};

// UPDATE
export const updateTask = async (taskId, taskData) => {
  const response = await api.put(`/tasks/update/${taskId}`, taskData);
  return response.data;
};

// DELETE
export const deleteTask = async (taskId) => {
  const response = await api.delete(`/tasks/delete/${taskId}`);
  return response.data;
};
