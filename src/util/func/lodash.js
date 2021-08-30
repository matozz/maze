export function debounce(fn, wait) {
  var timer = null;

  const debounced = function () {
    var context = this,
      args = arguments;
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, wait);
  };
  return debounced;
}
