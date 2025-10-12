import { HTTP } from "../http";
import { ERROR_TEXT } from "./utils/constants";

export default async function changeRole(teamId, teamMemberId, roleName) {
  try {
    const response = await HTTP.patch(
      `/teams/${teamId}/members/${teamMemberId}/role-name`,
      null,
      {
        params: { role_name: roleName },
      }
    );

    return response.data;
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