import { HTTP } from "../http";

/**
 * Отклоняет шаг на доработку участнику/капитану команды.
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
 *   const response = await rejectStep(projectId, stepNumber, data);
 *   console.log('Проекты:', response.data);
 * } catch (error) {
 *   console.error('Ошибка аутентификации:', error.message);
 * }
 */

export default async function rejectStep(projectId, stepNumber, timerStep, scoreStep) {
    try {
        const response = await HTTP.patch(`/projects/${projectId}/steps/${stepNumber}/attempts`,
            {
                action: "reject",
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