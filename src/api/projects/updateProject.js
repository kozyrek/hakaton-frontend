import { HTTP } from "../http";
import { ERROR_TEXT } from "../../api/utils/constants";

export default async function updateProject(projectId, name, description, document) {
    try {
        let formData = new FormData();
        const data = {
            name: name,
            description: description,
        };
        formData.append('data', JSON.stringify(data))
        formData.append('document', document)

        const response = await HTTP.patch(`/projects/${projectId}`, formData);
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