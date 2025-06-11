import { HTTP } from "./http";

export default async function getAllUser(params, page = 1) {
  const queryString = new URLSearchParams();

  if (params?.search) {
    queryString.append("search", params.search);
  }
  queryString.append("ordering", "verified");

  if (params?.is_team_member !== undefined) {
    queryString.append("is_team_member", params.is_team_member.toString());
  }

  if (params?.is_mentor !== null && params?.is_mentor !== undefined) {
    queryString.append("is_mentor", params.is_mentor);
  }

  const response = await HTTP.get(`/users?${queryString.toString()}`);

  return response.data;
}
