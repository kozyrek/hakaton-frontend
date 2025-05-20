import { HTTP } from "../http";

const ERROR_TEXT = {
    NETWORK_ERROR: "Network error. Please check your connection.",
    AUTHENTICATION_FAILED: "Authentication failed. Please try again.",
};

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
 *   const response = await getAnyDataDeleteAfterDev();
 *   console.log('Проекты:', response.data);
 * } catch (error) {
 *   console.error('Ошибка аутентификации:', error.message);
 * }
 */

export default function getAnyDataDeleteAfterDev() {
    try {
        // const response = HTTP.get("/projects/?page=1&per_page=25");

        // const response = HTTP.delete("/projects/5");

        const response = HTTP.get("/users/28");

        // const response = HTTP.patch("/teams/9", {
        //     "name": "Вторая команда",
        //     "projectId": 3,
        //     "teamMembers": [
        //     ]
        //   });
        console.log(response.data);

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