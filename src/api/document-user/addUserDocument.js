import { HTTP } from "../http";

export default async function addUserDocument(file) {
  const formData = new FormData();
  formData.append("uploaded_file", file);
  
  try {
    const response = await HTTP.post(`/users/documents`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading document:', error);
    
    if (error.response?.status === 413) {
      throw new Error('Размер файла превышает ограничение 10MB');
    } else if (error.response?.status === 415) {
      throw new Error('Недопустимый формат файла');
    } else if (error.response?.status === 409) {
      throw new Error('Файл с таким именем уже существует');
    }
    
    throw new Error('Ошибка при загрузке файла');
  }
}