const test = require("tape")
const head = require("./head")

/**
 * Get left most element of array
 *
 * @param  {Array}  source  The source
 *
 * @return {mixed}
 *
 * @tag Array
 * @signature (source: Array): mixed
 *
 * @example
 * head([1, 2, 3])
 * // => 1
 * head([])
 * // => null
 */
test("array::head", t => {
  t.equal(head([1, 2, 3]), 1, "Get first element of number array")

  t.equal(head([]), null, "Get first element of empty array")

  t.end()
})
