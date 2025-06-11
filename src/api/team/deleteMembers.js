import { HTTP } from "../http";
import { ERROR_TEXT } from "./utils/constants";

export default async function deleteMembers(team_id, team_member_id) {
  try {
    const response = await HTTP.delete(`/teams/${team_id}/members/${team_member_id}`);

    return response;
  } catch (error) {
    if (!error.response) {
      throw new Error(ERROR_TEXT.NETWORK_ERROR);
    }

    const message =
      error.response.data?.detail ||
      error.response.data?.message ||
      ERROR_TEXT.AUTHENTICATION_FAILED;

    throw new Error(message);
  }
}