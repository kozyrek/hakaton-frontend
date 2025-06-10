import { HTTP } from "../http";
import { ERROR_TEXT } from "./utils/constants";

export default async function getAllTeams() {
  try {
    const response = await HTTP.get("/teams");

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
