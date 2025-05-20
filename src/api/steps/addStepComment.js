import { HTTP } from "../http";

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
 *   const response = await acceptStep(projectId, stepNumber, timerStep, scoreStep);
 *   console.log('Проекты:', response.data);
 * } catch (error) {
 *   console.error('Ошибка аутентификации:', error.message);
 * }
 */

export default async function addStepComment(projectId, stepNumber, data) {
    try {
        const response = await HTTP.post(`/projects/${projectId}/steps/${stepNumber}/comments`, data);
        console.log(response.data);

        return response.data
    } catch (error) {
        console.log(error);
    }
};