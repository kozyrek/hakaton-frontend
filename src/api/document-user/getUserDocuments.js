import { HTTP } from "../http";

export default async function getUserDocuments(id) {
  const response = await HTTP.get(`/users/${id}/documents`);
  return response.data;
}
