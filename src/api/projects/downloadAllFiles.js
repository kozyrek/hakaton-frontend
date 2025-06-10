import { HTTP } from "../http";
import { ERROR_TEXT } from "../../api/utils/constants";

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