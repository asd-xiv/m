const test = require("tape")
const debounce = require("./debounce")

/**
 * Call a function only after it wasn't called for `timeWindow` ms.
 *
 * @param  {Function}  fn            Source function
 * @param  {number}    timeWindow    Time that needs to pass without calling
 *                                   so that the function is actually called
 *
 * @return {Function}
 */

test("core::debounce", t => {
  /**
   * Debounce with defaults
   */
  let defaultCounter = 0
  const defaultSet = debounce(source => {
    defaultCounter = source
  })

  for (let i = 0; i < 100; i++) {
    defaultSet(i)
  }

  // Wait until the internal timer of debounce finishes
  setTimeout(() => {
    t.equal(
      defaultCounter,
      99,
      "Calling debounce function 100 times should run it once, 50ms after last call"
    )
  }, 100)

  /**
   * Debounce with custom
   */

  let customCounter = 0
  const customSet = debounce(
    source => {
      customCounter = source
    },
    { timeWindow: 100, bind: null }
  )

  for (let i = 0; i < 100; i++) {
    customSet(i)
  }

  // Wait until the internal timer of debounce finishes
  setTimeout(() => {
    t.equal(
      customCounter,
      99,
      "Calling debounced function 100 times with custom timer window"
    )
  }, 150)

  // Make sure the tests end after both test timers end
  setTimeout(() => {
    t.end()
  }, 200)
})
