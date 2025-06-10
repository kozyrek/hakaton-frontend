import { HTTP } from "../http";
import { ERROR_TEXT } from "../../api/utils/constants";

/**
 * Добавляет комментарий на шаге проекта.
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
 *   const response = await addStepComment(projectId, stepNumber, data);
 *   console.log('Комментарий:', response.data);
 * } catch (error) {
 *   console.error('Ошибка аутентификации:', error.message);
 * }
 */

export default async function addStepComment(projectId, stepNumber, data) {
    try {
        const response = await HTTP.post(`/projects/${projectId}/steps/${stepNumber}/comments`, data);
        console.log(response.data);

        return response
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