import { HTTP } from "../http";

/**
 * Устанавливает новый таймер для шага проекта.
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
 *   const response = await setTimerStep(projectId, stepNumber, timerStep);
 *   console.log('Новый таймер:', response.data);
 * } catch (error) {
 *   console.error('Ошибка:', error.message);
 * }
 */

export default async function setTimerStep(projectId, stepNumber, timerStep) {
    try {
        const response = await HTTP.patch(`/projects/${projectId}/steps/${stepNumber}/attempts`,
            {
                action: "set-timer",
                timer: timerStep,
                // score: scoreStep,
            },
        );
        console.log(response.data);

        return response.data
    } catch (error) {
        console.log(error);
    }
};