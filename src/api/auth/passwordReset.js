import { HTTP } from "../http";

export const requestPasswordReset = async (email) => {
  try {
    const response = await HTTP.post("/auth/password-resets", email, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const resetPasswordWithToken = async (data) => {
  try {
    const response = await HTTP.post("/auth/password-resets/callback", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};