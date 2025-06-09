import { HTTP } from "../http";
import { ERROR_TEXT } from "../../api/utils/constants";

/**
 * Передает на сервер данные по шагу проекта.
 *
 * @returns {Promise<object>} Promise с ответом сервера.
 * @throws {Error} Возможные ошибки:
 * - Проблемы с сетью
 * - Неверные учетные данные
 * - Ошибки валидации на стороне сервера
 *
 * @example
 * // Пример использования
 * try {
 *   const response = await sendDataStepProject(projectId, stepNumber, data);
 *   console.log('Шаг:', response.data);
 * } catch (error) {
 *   console.error('Ошибка аутентификации:', error.message);
 * }
 */

export default async function sendDataStepProject(projectId, stepNumber, data) {
    try {
        const response = await HTTP.post(`/projects/${projectId}/steps/${stepNumber}/attempts/submission`, data);
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