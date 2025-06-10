import { HTTP } from "../http";
import { ERROR_TEXT } from "../../api/utils/constants";

/**
 * Одобряет шаг проекта ментором.
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
 *   const response = await acceptStep(projectId, stepNumber, scoreStep);
 *   console.log('Шаг одобрен:', response.data);
 * } catch (error) {
 *   console.error('Ошибка:', error.message);
 * }
 */

export default async function acceptStep(projectId, stepNumber, scoreStep) {
    try {
        const response = await HTTP.patch(`/projects/${projectId}/steps/${stepNumber}/attempts`,
            {
                action: "accept",
                score: scoreStep,
            },
        );
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