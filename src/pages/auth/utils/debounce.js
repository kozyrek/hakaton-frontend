/**
 * Возвращает обертку для переданной функции, которая выполняет cb с указанной задержкой
 * @param {*} func функция колл-бек cb
 * @param {*} delay задержка в мс
 */
export function debounce(func, delay) {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}