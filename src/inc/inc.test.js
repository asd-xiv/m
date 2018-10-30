const test = require("tape")
const inc = require("./inc")

/**
 * Add one
 *
 * @param  {number}  source  Source input
 *
 * @return {number}
 *
 * @tag Number
 * @signature (source: number): number
 *
 * @example
 * inc(2)
 * // => 3
 */
test("number::inc", t => {
  t.equal(inc(2), 3, "Increment number")

  t.end()
})
