import { HTTP } from "../http";

/**
 * Одобряет шаг проека ментором.
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

export default async function acceptStep(projectId, stepNumber, timerStep, scoreStep) {
    try {
        const response = await HTTP.patch(`/projects/${projectId}/steps/${stepNumber}/attempts`,
            {
                action: "accept",
                timer: timerStep,
                score: scoreStep,
            },
        );
        console.log(response.data);

        return response.data
    } catch (error) {
        console.log(error);
    }
};