import { allUsers } from "./temp";

const ERROR_TEXT = "Пользователь не найден.";

export default function getUserById(id) {
  return new Promise((res, reg) => {
    setTimeout(() => {
      const result = allUsers.find((item) => String(item.id) === id);
      if (result) {
        res(result);
      } else {
        reg(new Error(ERROR_TEXT));
      }
    }, 2000);
  });
}
