import { HTTP } from "./http";

export default async function getAllUser(params, is_mentor = false, page = 1) {
  const queryString = new URLSearchParams();

  if (params?.search) {
    queryString.append("search", params.search);
  }
  queryString.append("ordering", "verified");

  if (params?.is_team_member !== undefined) {
    queryString.append("is_team_member", params.is_team_member.toString());
  }

  const response = await HTTP.get(`/users?${queryString.toString()}`);

  return response.data;
}
