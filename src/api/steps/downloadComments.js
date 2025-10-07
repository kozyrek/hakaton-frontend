import { HTTP } from "../http";
import { ERROR_TEXT } from "../../api/utils/constants";

export default async function downloadComments(projectId, stepNumber) {
    try {
        const response = await HTTP.get(`/projects/${projectId}/steps/${stepNumber}/step-files`, {
            responseType: 'blob',}
        );

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