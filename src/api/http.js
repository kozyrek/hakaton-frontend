import axios from "axios";
import getNewToken from "./getNewToken";
import getUser from "./getUser";
import { add_token, logout, set_user } from "../store/user/userSlice";
import { store } from "../store/store";

const HTTP = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 10000,
});

const updateAuthHeader = (token) => {
  if (token) {
    HTTP.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete HTTP.defaults.headers.common["Authorization"];
  }
};

const initializeAuthHeader = () => {
  const { accessToken } = store.getState().user.token;
  updateAuthHeader(accessToken);
};
initializeAuthHeader();

HTTP.interceptors.request.use(
  (config) => {
    // Для FormData не устанавливаем Content-Type, чтобы браузер сам добавил boundary
    if (!(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    }

    const { accessToken } = store.getState().user.token;
    if (accessToken && !config.headers["Authorization"]) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

HTTP.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { refreshToken } = store.getState().user.token;
        if (!refreshToken) throw new Error("No refresh token available");

        const newToken = await getNewToken(refreshToken);
        store.dispatch(add_token(newToken.data));

        updateAuthHeader(newToken.data.accessToken);

        const user = await getUser();
        store.dispatch(set_user(user));

        originalRequest.headers.Authorization = `Bearer ${newToken.data.accessToken}`;
        return HTTP(originalRequest);
      } catch (refreshError) {
        store.dispatch(logout());
        return Promise.reject(refreshError);
      }
    }

    handleApiError(error);
    return Promise.reject(error);
  }
);

const handleApiError = (error) => {
  if (!error.response) {
    console.error("Network error:", error);
    return;
  }

  const { status, data } = error.response;
  const errorMessages = {
    400: "Некорректный запрос",
    403: "Доступ запрещен",
    404: "Ресурс не найден",
    409: "Конфликт данных",
    413: "Файл слишком большой",
    415: "Неподдерживаемый формат файла",
    422: "Ошибка валидации",
    500: "Ошибка сервера",
  };

  const message =
    data?.message || errorMessages[status] || "Неизвестная ошибка";
  console.error(`Ошибка ${status}:`, message);

  // Нужно добавить тосты для показа ошибок пользователю
};

export { HTTP, updateAuthHeader };
