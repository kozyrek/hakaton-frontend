import { HTTP } from "../http";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ERROR_TEXT } from "../../api/utils/constants";

/**
 * Передает на сервер данные по шагу проекта.
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
 *   const response = await sendDataStepProject(projectId, stepNumber, data);
 *   console.log('Шаг:', response.data);
 * } catch (error) {
 *   console.error('Ошибка аутентификации:', error.message);
 * }
 */

export default async function sendDataStepProject(projectId, stepNumber, data) {
    const errors = {
        "Too many files to send. Maximum is 10": "Максимальное количество файлов для отправки 10",
    }

    try {
        const response = await HTTP.post(`/projects/${projectId}/steps/${stepNumber}/attempts/submission`, data);
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