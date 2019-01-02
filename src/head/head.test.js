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
 * // => undefined
 */
test("array::head", t => {
  t.equal(head([1, 2, 3]), 1, "From number array should return first element")
  t.equal(head([]), undefined, "From empty array should return undefined")
  t.equal(head(2), undefined, "From number should return undefined")
  t.equal(head({}), undefined, "From object should return undefined")
  t.equal(head(() => {}), undefined, "From function should return undefined")

  t.end()
})
