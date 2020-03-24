import test from "tape"
import { debounce } from ".."

test("core::debounce", t => {
  /**
   * Debounce with defaults
   */
  let defaultCounter = 0

  let callCount = 0
  const defaultSet = debounce(source => {
    callCount = callCount + 1
    defaultCounter = source
  })

  for (let i = 0; i < 100; i++) {
    defaultSet(i)
  }

  setTimeout(() => {
    t.equal(
      callCount + defaultCounter,
      1 + 99,
      "Calling debounce function 100 times should run it once, 50ms after last call"
    )
  }, 100)

  /**
   * Debounce with custom
   */
  let customCounter = 0

  let customCallCount = 0
  const customSet = debounce(
    source => {
      customCallCount = customCallCount + 1
      customCounter = source
    },
    { wait: 100, bind: null }
  )

  for (let i = 0; i < 100; i++) {
    customSet(i)
  }

  setTimeout(() => {
    t.equal(
      customCallCount + customCounter,
      1 + 99,
      "Calling debounced function 100 times with custom timer window"
    )

    t.end()
  }, 150)
})
