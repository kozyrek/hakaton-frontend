import { HTTP } from "../http";

export default async function getUserDocuments(id) {
  // Добавляем проверку на валидность ID
  if (!id || (typeof id !== 'number' && typeof id !== 'string')) {
    throw new Error("Неверный ID пользователя");
  }

  try {
    const response = await HTTP.get(`/users/${id}/documents`);
    return response.data;
  } catch (error) {
    if (!error.response) {
      throw new Error("Ошибка сети");
    }

    const message =
      error.response.data?.detail ||
      error.response.data?.message ||
      "Ошибка аутентификации";

    throw new Error(message);
  }
}