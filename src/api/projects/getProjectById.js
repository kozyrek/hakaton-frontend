import { HTTP } from "../http";
import { ERROR_TEXT } from "../../api/utils/constants";

/**
 * Получает проект с заданным id.
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
 *   const response = await getProjectById(id);
 *   console.log('Проект:', response.data);
 * } catch (error) {
 *   console.error('Ошибка аутентификации:', error.message);
 * }
 */
export default async function getTeamById(id) {
    // ДОБАВЛЕНО: Валидация ID
    if (!id || id === "null" || id === "undefined") {
        throw new Error("Неверный ID команды");
    }
    
    if (isNaN(parseInt(id))) {
        throw new Error("ID команды должен быть числом");
    }

    try {
        const response = await HTTP.get(`/teams/${id}`);
        return response;
    } catch (error) {
        if (!error.response) {
            throw new Error(ERROR_TEXT.NETWORK_ERROR);
        }

        // Более точная обработка 422 ошибки
        if (error.response.status === 422) {
            throw new Error("Неверный формат ID команды");
        }

        const message = error.response.data?.detail ||
                       error.response.data?.message ||
                       ERROR_TEXT.AUTHENTICATION_FAILED;

        throw new Error(message);
    }
};