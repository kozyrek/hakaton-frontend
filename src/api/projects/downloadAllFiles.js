import { HTTP } from "../http";
import { ERROR_TEXT } from "../../api/utils/constants";

export default async function downloadAllFiles(projectId) {
    try {
        const response = await HTTP.get(`/projects/${projectId}/files-zip` , {
        responseType: 'blob',});
        console.log(response.data);

        var FILE = window.URL.createObjectURL(response.data);
        var docUrl = document.createElement('a');
        docUrl.href = FILE;
        docUrl.setAttribute('target', '_blank');
        docUrl.setAttribute('type', 'application/zip');
        document.body.appendChild(docUrl);
        docUrl.click();

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