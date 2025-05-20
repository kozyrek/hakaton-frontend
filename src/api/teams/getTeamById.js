import { HTTP } from "../http";

const ERROR_TEXT = {
    NETWORK_ERROR: "Network error. Please check your connection.",
    AUTHENTICATION_FAILED: "Authentication failed. Please try again.",
};

/**
 * Получает данные команды по номеру id.
 *
 * @returns {Promise<object>} Promise с ответом сервера, содержащим данные команды.
 * @throws {Error} Возможные ошибки:
 * - Проблемы с сетью
 * - Неверные учетные данные
 * - Ошибки валидации на стороне сервера
 *
 * @example
 * // Пример использования
 * try {
 *   const response = await getTeamById(id);
 *   console.log('Команда:', response.data);
 * } catch (error) {
 *   console.error('Ошибка аутентификации:', error.message);
 * }
 */

export default async function getTeamById(id) {
    try {
        const response = await HTTP.get(`/teams/${id}`);
        console.log(response.data)
        return response.data
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