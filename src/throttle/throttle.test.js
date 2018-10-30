const test = require("tape")
const throttle = require("./throttle")

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
test("core::throttle", t => {
  let counter = 0
  const testFn = throttle(() => {
    counter++
  })

  for (let i = 0; i < 10; i++) {
    testFn()
  }

  t.equal(counter, 1, "Calling functions multiple times should run it once")

  t.end()
})
