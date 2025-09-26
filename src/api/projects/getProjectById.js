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
 *   console.error('Ошибка загрузки проекта:', error.message);
 * }
 */
export default async function getProjectById(id) {
    // ДОБАВЛЕНО: Валидация ID
    if (!id || id === "null" || id === "undefined") {
        throw new Error("Неверный ID проекта");
    }
    
    if (isNaN(parseInt(id))) {
        throw new Error("ID проекта должен быть числом");
    }

    try {
        // ИСПРАВЛЕНИЕ: Используем правильный endpoint для проектов
        const response = await HTTP.get(`/projects/${id}`);
        return response;
    } catch (error) {
        if (!error.response) {
            throw new Error(ERROR_TEXT.NETWORK_ERROR);
        }

        // Более точная обработка ошибок
        if (error.response.status === 422) {
            throw new Error("Неверный формат ID проекта");
        }

        if (error.response.status === 404) {
            throw new Error("Проект не найден");
        }

        const message = error.response.data?.detail ||
                       error.response.data?.message ||
                       ERROR_TEXT.AUTHENTICATION_FAILED;

        throw new Error(message);
    }
};