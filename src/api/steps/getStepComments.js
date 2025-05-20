import { HTTP } from "../http";

const ERROR_TEXT = {
    NETWORK_ERROR: "Network error. Please check your connection.",
    AUTHENTICATION_FAILED: "Authentication failed. Please try again.",
};

/**
 * Получает комментарии шага проекта.
 *
 * @returns {Promise<object>} Promise с ответом сервера, содержащим массив комментариев.
 * @throws {Error} Возможные ошибки:
 * - Проблемы с сетью
 * - Неверные учетные данные
 * - Ошибки валидации на стороне сервера
 *
 * @example
 * // Пример использования
 * try {
 *   const response = await getStepComments(projectId, stepNumber);
 *   console.log('Шаг проекта:', response.data);
 * } catch (error) {
 *   console.error('Ошибка аутентификации:', error.message);
 * }
 */

export default async function getStepComments(projectId, stepNumber) {
    try {
        const response = await HTTP.get(`/projects/${projectId}/steps/${stepNumber}/comments`);

        console.log(`комментарии шага ${stepNumber} проекта # ${projectId}`, response.data);

        return response.data
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