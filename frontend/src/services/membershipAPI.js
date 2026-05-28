import { api } from "./api";

export const getProjectMemberships = async (projectId) => {
  //"/search/{projectId}/members"
  const response = await api.get(`/projects/search/${projectId}/members`);
  return response.data;
};

//Actualizar el rol de un miembro del proyecto
export const updateMemberRole = async (projectId, userId, newRole) => {
  const response = await api.patch(`/projects/update/${projectId}/${userId}`, {
    role: newRole,
  });
  return response.data;
};

//Expulsar a un miembro del proyecto
export const removeProjectMember = async (projectId, memberId) => {
  const response = await api.put(
    `/projects/update/${projectId}/remove_member/${memberId}`,
  );
  return response.data;
};
