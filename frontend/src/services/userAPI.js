import { api } from "./api";

export const searchUsersByName = async (name) => {
  const response = await api.get(`/users/search/name/${name}`);
  return response.data;
};
