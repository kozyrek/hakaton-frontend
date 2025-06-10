import { HTTP } from "./http";

const ERROR_TEXT = {
    NETWORK_ERROR: "Network error. Please check your connection.",
    AUTHENTICATION_FAILED: "Authentication failed. Please try again.",
};

/**
 * Получает обновленный токен доступа.
 *
 * @param {string} refreshToken - токен обновления
 * @returns {Promise<object>} Promise с ответом сервера, содержащим токены доступа (access) и обновления (refresh)
 * @throws {Error} Возможные ошибки:
 * - Проблемы с сетью
 * - Неверные учетные данные
 * - Ошибки валидации на стороне сервера
 *
 * @example
 * // Пример использования
 * try {
 *   const response = await getNewToken('refreshToken');
 *   console.log('Токен доступа:', response.data.access);
 * } catch (error) {
 *   console.error('Ошибка аутентификации:', error.message);
 * }
 */

export default async function getNewToken(refreshToken) {
    try {
        return await HTTP.post("/auth/token/refresh", {
            refreshToken,
        });
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