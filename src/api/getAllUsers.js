import { HTTP } from "./http";

export default async function getAllUser(params = {}) {
  // Параметры теперь передаются напрямую, включая page и per_page
  const response = await HTTP.get('/users', {
    params: params
  });
  return response.data;
}