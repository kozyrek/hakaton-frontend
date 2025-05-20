import { HTTP } from "../http";

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
 *   const response = await getProjects();
 *   console.log('Проекты:', response.data);
 * } catch (error) {
 *   console.error('Ошибка аутентификации:', error.message);
 * }
 */

export default async function sendDataStepProject(projectId, stepNumber, data) {
    try {
        const response = await HTTP.post(`/projects/${projectId}/steps/${stepNumber}/attempts/submission`, data
        //     {
        //     "name": "Вторая команда",
        //     "projectId": 3,
        //     "teamMembers": [
        //     ]
        //   }
        );
        console.log(response.data);

        return response.data
    } catch (error) {
        console.log(error);
    }
};