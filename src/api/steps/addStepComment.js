import { HTTP } from "../http";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ERROR_TEXT } from "../../api/utils/constants";

/**
 * Добавляет комментарий на шаге проекта.
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
 *   const response = await addStepComment(projectId, stepNumber, data);
 *   console.log('Комментарий:', response.data);
 * } catch (error) {
 *   console.error('Ошибка аутентификации:', error.message);
 * }
 */

export default async function addStepComment(projectId, stepNumber, data) {
    const errors = {
        "Too many files to send. Maximum is 5": "Максимальное количество файлов для отправки 5",
    }

    try {
        const response = await HTTP.post(`/projects/${projectId}/steps/${stepNumber}/comments`, data);
        return response;
    } catch (error) {
        if (!error.response) {
            toast.error(ERROR_TEXT.NETWORK_ERROR,
                {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                }
            );
        } else {
            toast.error(
                errors[error.response?.data?.detail] || "Произошла неизвестная ошибка",
                {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                }
            );
        }
    }
};