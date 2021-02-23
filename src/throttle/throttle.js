/**
 * Create a wrapper function that is invoked once every time interval, regardless
 * of how many times is called.
 *
 * @param {Function} fn
 * @param {Object}   [props]
 * @param {number}   [props.wait=50]           Time in milliseconds between "fn" invokations
 * @param {boolean}  [props.hasLastCall=false] If should call "fn" after wrapper is no longer called
 *
 * @returns {Function}
 *
 * @name throttle
 * @tag Core
 * @signature (fn: Function, { wait: number }): Function
 *
 * @example
 * const thottledMouseMove = throttle(mouseMove, { wait: 100 })
 *
 * // render
 * <input onMouseMove={thottledMouseMove} ... />
 */
const throttle = (fn, { wait = 50, hasLastCall = false } = {}) => {
  let lastExecution = new Date(Date.now() - wait)

  let finalRunTimer

  return (...params) => {
    const hasTimeWindowPassed = lastExecution.getTime() + wait <= Date.now()

    // once every
    if (hasTimeWindowPassed) {
      lastExecution = new Date()

      fn(...params)
    }

    if (hasLastCall) {
      clearTimeout(finalRunTimer)

      finalRunTimer = setTimeout(() => {
        lastExecution = new Date()

        fn(...params)
      }, wait)
    }
  }
}

export { throttle }
