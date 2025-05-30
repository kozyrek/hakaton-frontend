import { HTTP } from "../http";
import { ERROR_TEXT } from "./utils/constants";

export default async function addMembers(teamId, membersAddList) {
  const requestData = membersAddList.map((member) => ({
    participantId: Number(member.participantId),
    roleName: "participant",
  }));
  try {
    const response = await HTTP.post(`/teams/${teamId}/members`, requestData);

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
