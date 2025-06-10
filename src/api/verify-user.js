import { HTTP } from "./http";

export default async function verifyUser(id) {
  const response = await HTTP.post(`/users/${id}/verification`);
  return response.data;
}
