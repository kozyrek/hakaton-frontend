export default function getUser(token) {
  return new Promise((res, reg) => {
    setInterval(() => {
      if (token === "frmlasd98asder") {
        res({
          lastName: "Sav",
          firstName: "Andrey",
        });
      } else {
        reg({
          error: "Invalid token.",
        });
      }
    }, 500);
  });
}
