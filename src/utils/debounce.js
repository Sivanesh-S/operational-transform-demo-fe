export const debounce = (fn, ms = 300) => {
  let timeoutId = undefined;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};
