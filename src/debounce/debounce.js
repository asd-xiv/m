/**
 * Call a function only after it wasn't called for `timeWindow` ms.
 *
 * @param  {Function}  fn            Source function
 * @param  {number}    timeWindow    Time that needs to pass without calling
 *                                   so that the function is actually called
 *
 * @return {Function}
 */
module.exports = (fn, { timeWindow = 50, bind = null } = {}) => {
  let finalRunTimer

  return (...args) => {
    // reset timer at every function call
    clearTimeout(finalRunTimer)

    finalRunTimer = setTimeout(() => {
      fn.apply(bind, args)
    }, timeWindow)
  }
}
