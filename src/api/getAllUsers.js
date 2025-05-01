import { HTTP } from "./http";

export default async function getAllUser(token, is_mentor = false, page = 1) {
  const response = await HTTP.get("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
