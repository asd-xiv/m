/**
 * Call a function only if it hasn't been called in the last `timeWindow` ms.
 *
 * @param  {function} fn            Function to be ran
 * @param  {integer}  timeWindow    Time between each `fn` call
 *
 * @return {function}               Either return `fn` if you've passed the
 *                                  `timeWindow` or return a timer that will
 *                                  run the `fn` in `timeWindow` ms
 */
module.exports = (
  fn,
  { timeWindow = 50, bind = null, hasLastCall = false } = {}
) => {
  let lastExecution = new Date(new Date().getTime() - timeWindow)
  let finalRunTimer

  return (...args) => {
    const hasTimeWindowPassed =
      lastExecution.getTime() + timeWindow <= new Date().getTime()

    if (hasTimeWindowPassed) {
      lastExecution = new Date()

      fn.apply(bind, args)
    }

    if (hasLastCall) {
      // reset timer at every function call
      clearTimeout(finalRunTimer)

      finalRunTimer = setTimeout(() => {
        lastExecution = new Date()

        fn.apply(bind, args)
      }, timeWindow)
    }
  }
}
