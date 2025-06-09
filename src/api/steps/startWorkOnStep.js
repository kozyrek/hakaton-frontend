import { HTTP } from "../http";
import { ERROR_TEXT } from "../../api/utils/constants";

/**
 * Начинает работу над шагом (начало отсчета таймера).
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
 *   const response = await startWorkOnStep(projectId, stepNumber);
 *   console.log('Старт работы на шаге:', response.data);
 * } catch (error) {
 *   console.error('Ошибка аутентификации:', error.message);
 * }
 */

export default async function startWorkOnStep(projectId, stepNumber) {
    try {
        const response = await HTTP.post(`/projects/${projectId}/steps/${stepNumber}/attempts`);
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