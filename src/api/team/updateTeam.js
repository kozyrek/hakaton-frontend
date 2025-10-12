import { HTTP } from "../http";
import { ERROR_TEXT } from "../../api/utils/constants";

export default async function updateTeam(teamId, data) {
    try {
        const response = await HTTP.patch(`/teams/${teamId}`, data);
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
};