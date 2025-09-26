import { HTTP } from "./http";

export default async function getAllUser(params = {}, page = 1, perPage = 10) {
  const queryString = new URLSearchParams();

  // Добавляем параметры только если они переданы и не null/undefined
  if (params?.search) {
    queryString.append("search", params.search);
  }
  
  // Добавляем ordering только если нужно
  if (params?.ordering !== undefined) {
    queryString.append("ordering", params.ordering);
  } else {
    queryString.append("ordering", "verified");
  }

  if (params?.is_team_member !== undefined) {
    queryString.append("is_team_member", params.is_team_member.toString());
  }

  if (params?.is_mentor !== undefined) {
    queryString.append("is_mentor", params.is_mentor.toString());
  }

  // Всегда добавляем пагинацию
  queryString.append("page", page.toString());
  queryString.append("per_page", perPage.toString());

  try {
    const response = await HTTP.get(`/users?${queryString.toString()}`);
    return response.data;
  } catch (error) {
    console.error("Error in getAllUser:", error);
    throw error;
  }
}