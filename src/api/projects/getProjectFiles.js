import { HTTP } from "../http";

/**
 * Получает файлы по проекту.
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
 *   const response = await getProjectFiles(projectId);
 *   console.log('Файлы проекта:', response.data);
 * } catch (error) {
 *   console.error('Ошибка аутентификации:', error.message);
 * }
 */

export default async function getProjectFiles(projectId) {
    try {
        const response = await HTTP.get(`/projects/${projectId}/files`);
        console.log(response.data);

        return response.data
    } catch (error) {
        console.log(error);
    }
};