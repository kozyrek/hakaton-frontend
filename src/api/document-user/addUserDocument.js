import { HTTP } from "../http";

export default async function addUserDocument(file) {
  const formData = new FormData();
  formData.append("uploaded_file", file);
  
  try {
    const response = await HTTP.post(`/users/documents`, formData);
    return response.data;
  } catch (error) {
    console.error('Error uploading document:', error);
    throw error;
  }
}