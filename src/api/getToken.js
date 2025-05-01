import { HTTP } from "./http";

const ERROR_TEXT = {
  NETWORK_ERROR: "Network error. Please check your connection.",
  AUTHENTICATION_FAILED: "Authentication failed. Please try again.",
};

/**
 * Аутентифицирует пользователя и получает токен доступа.
 *
 * @param {string} email - Email пользователя
 * @param {string} password - Пароль пользователя
 * @returns {Promise<object>} Promise с ответом сервера, содержащим токены доступа (access) и обновления (refresh)
 * @throws {Error} Возможные ошибки:
 * - Проблемы с сетью
 * - Неверные учетные данные
 * - Ошибки валидации на стороне сервера
 *
 * @example
 * // Пример использования
 * try {
 *   const response = await getToken('user@example.com', 'password123');
 *   console.log('Токен доступа:', response.data.access);
 * } catch (error) {
 *   console.error('Ошибка аутентификации:', error.message);
 * }
 */

export const getToken = async (email, password) => {
  try {
    return await HTTP.post("/auth/login", {
      email,
      password,
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
