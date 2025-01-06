function debounce (func, delay = 17, options = { leading: true, context: null }) {
  let timer = null
  const _debounce = function (...args) {
    if (timer) {
      clearTimeout(timer)
    }

    if (options.leading && !timer) {
      timer = setTimeout(null, delay)
      func.apply(options.context || this, args)
    } else {
      clearTimeout(timer)
      console.log(111)
      timer = setTimeout(() => {
        func.apply(options.context || this, args)
        // timer = null
        console.log(222)
      }, delay)
    }
  }
  _debounce.cancel = function () {
    clearTimeout(timer)
    timer = null
  }
  return _debounce
}

export {
  debounce
}
