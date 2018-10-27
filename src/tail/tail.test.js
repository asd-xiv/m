const test = require("tape")
const tail = require("./tail")

/**
 * Get right most element of array
 *
 * @param  {Array}  source  The source
 *
 * @return {mixed}
 *
 * @tag Array
 * @signature (source: Array): mixed
 *
 * @example
 * tail([1, 2, 3])
 * // => 3
 * tail([])
 * // => null
 */
test("array::tail", t => {
  t.equals(tail([1, 2, 3]), 3, "Get last element of number array")

  t.equals(tail([]), null, "Get last element of empty array")

  t.end()
})
