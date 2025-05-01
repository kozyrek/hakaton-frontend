import axios from "axios";
import getNewToken from "./getNewToken";
import getUser from "./getUser";
import { add_token, logout, set_user } from "../store/user/userSlice";
import { store } from "../store/store";

const HTTP = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
  },
  timeout: 10000,
})

HTTP.interceptors.response.use(function (response) {
  return response;
}, async function (error) {
  switch (error.response.status) {
    case 401:
      console.log('ошибка 401', error.response);

      const { refreshToken } = store.getState().user.token;
      if (refreshToken) {
        const newToken = await getNewToken(refreshToken);
        // console.log("рефреш токен 3", refreshToken);
        // console.log("новый токен", newToken)
        store.dispatch(add_token(newToken.data))

        const user = await getUser(newToken.data.accessToken);
        store.dispatch(set_user(user))
      } else {
        store.dispatch(logout);
      }
      break;

    case 403:
      console.log('ошибка 403');
      alert("У вас недостаточно прав для выполнения данного действия");
      // return (
      //   <ModalWindow title="У вас недостаточно прав для выполнения данного действия" />
      // );
      break;

    case 400:
      console.log('ошибка 400');
      alert("Недопустимый JSON в поле user_data, или строка данных должна быть допустимым JSON.");
      break;

    case 409:
      console.log('ошибка 409');
      alert("Конфликт запроса с текущим состоянием сервера.");
      break;

    case 413:
      console.log('ошибка 413');
      alert("Размер файла превышает установленный лимит.");
      break;

    case 415:
      console.log('ошибка 415');
      alert("Неподдерживаемый формат файла фотографии.");
      break;

    case 422:
      console.log('ошибка 422');
      alert("Ошибка проверки данных. Проверка модели не удалась.");
      break;

    case 500:
      console.log('ошибка 500');
      alert("При обращении к серверу произошла ошибка");
      break;

    default:
      return Promise.reject(error) 
  }
});

export {HTTP};