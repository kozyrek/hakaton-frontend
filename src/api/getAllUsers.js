import { allUsers } from "./temp";

export default function getAllUser(is_mentor = false, page = 1) {
  return new Promise((res, reg) => {
    setTimeout(() => {
      res({
        page: 0,
        perPage: 0,
        totalPages: 0,
        total: 0,
        items: allUsers,
      });
    }, 500);
  });
}
