export const getToken = (login, password) => {
  return new Promise((res, reg) => {
    setTimeout(() => {
      if (login !== "an@an.ru") {
        reg({ error: "Неверный логин" });
      }
      res({
        accessToken: "frmlasd98asder",
        refreshToken: "afddlaaE4dal5",
      });
    }, 2000);
  });
};
