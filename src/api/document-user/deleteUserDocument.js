import { HTTP } from "../http";

export default async function deleteUserDocument(id) {
  const response = await HTTP.delete(`/users/documents/${id}`);
  return response.data;
}
