// src/api/changePassword.js
import { HTTP } from "../http";

export const changePassword = async (passwordData) => {
  try {
    const response = await HTTP.put("/auth/passwords", passwordData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};