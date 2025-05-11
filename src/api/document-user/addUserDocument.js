import { HTTP } from "../http";

export default async function addUserDocument(file) {
  const formData = new FormData();
  formData.append("uploaded_file", file);
  const response = await HTTP.post(`/users/documents`, formData);
  return response;
}
