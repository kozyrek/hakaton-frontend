import { HTTP } from "../http";

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
 *   console.log('Проекты:', response.data);
 * } catch (error) {
 *   console.error('Ошибка аутентификации:', error.message);
 * }
 */

export default async function startWorkOnStep(projectId, stepNumber) {
    try {
        const response = await HTTP.post(`/projects/${projectId}/steps/${stepNumber}/attempts`);
        console.log(response.data);

        return response.data
    } catch (error) {
        console.log(error);
    }
};