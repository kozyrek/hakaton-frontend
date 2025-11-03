import { HTTP } from "../http";

export default async function getUserDocuments(id) {
  if (!id || (typeof id !== 'number' && typeof id !== 'string')) {
    console.warn('Invalid user ID for document fetch:', id);
    return [];
  }

  try {
    const response = await HTTP.get(`/users/${id}/documents`);
    
    // Убедимся, что возвращаем массив
    if (Array.isArray(response.data)) {
      return response.data.filter(doc => doc && doc.id); // Фильтруем только валидные документы
    }
    
    console.warn('Expected array from documents API, got:', response.data);
    return [];
  } catch (error) {
    console.error('Error fetching user documents:', error);
    
    // Если документов нет (404) или другие ошибки - возвращаем пустой массив
    if (error.response?.status === 404) {
      return [];
    }
    
    throw error;
  }
}