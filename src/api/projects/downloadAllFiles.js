import { HTTP } from "../http";

/**
 * Скачивает все файлы по проекту.
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
 *   const response = await downLoadAllFiles(projectId);
 *   console.log('Все файлы проекта:', response.data);
 * } catch (error) {
 *   console.error('Ошибка:', error.message);
 * }
 */

export default async function downloadAllFiles(projectId) {
    try {
        const response = await HTTP.get(`/projects/${projectId}/files-zip`);
        console.log(response.data);

        return response.data
    } catch (error) {
        console.log(error);
    }
};