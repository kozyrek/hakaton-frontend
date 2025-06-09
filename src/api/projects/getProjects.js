import { HTTP } from "../http";
import { ERROR_TEXT } from "../../api/utils/constants";

/**
 * Получает массив проектов.
 *
 * @returns {Promise<object>} Promise с ответом сервера, содержащим массив проектов
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

export default async function getProjects() {
    try {
        const response = await HTTP.get("/projects/");
        return response;
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