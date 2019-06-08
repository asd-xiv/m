import test from "tape"
import { throttle } from ".."

test("throttle", t => {
  /**
   * Throttle with defaults
   */
  let defaultCounter = 0
  const defaultInc = throttle(() => {
    defaultCounter++
  })

  for (let i = 0; i < 100; i++) {
    defaultInc()
  }

  setTimeout(() => {
    t.equal(
      defaultCounter,
      1,
      "Calling throttled function 100 times should run it once"
    )
  }, 100)

  /**
   * Throttle with custom
   */

  let customCounter = 0
  const customInc = throttle(
    () => {
      customCounter++
    },
    { timeWindow: 50, bind: null, hasLastCall: true }
  )

  for (let i = 0; i < 100; i++) {
    customInc()
  }

  setTimeout(() => {
    t.equal(
      customCounter,
      2,
      "Calling throttled function 100 times with lastCall enabled should run it twice"
    )

    t.end()
  }, 100)
})
