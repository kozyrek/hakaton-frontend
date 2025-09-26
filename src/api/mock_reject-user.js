import { HTTP } from "./http";

export default async function rejectUser(userId) {
  const response = await HTTP.post(`/admin/users/${userId}/reject`);
  return response.data;
}