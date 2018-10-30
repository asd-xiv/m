const test = require("tape")
const dec = require("./dec")

/**
 * Substract one
 *
 * @param  {number}  source  Source input
 *
 * @return {number}
 *
 * @tag Number
 * @signature (source: number): number
 *
 * @example
 * dec(2)
 * // => 1
 */
test("number::dec", t => {
  t.equal(dec(2), 1, "Decrement number")

  t.end()
})
