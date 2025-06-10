import { HTTP } from "./http";

export default async function deleteUser(id) {
  const response = await HTTP.delete(`/users/${id}`);
  return response.data;
}
