const test = require("tape")
const remove = require("./remove")

/**
 * Remove element(s) from array by value or by filter function
 *
 * @param  {Function|mixed}  value   Value to remove
 * @param  {Array}           source  Source array
 *
 * @return {Array}
 *
 * @tag Array
 * @signature (value: Function|mixed) => (source: Array): Array
 *
 * @example
 * remove(3)([1, 2, 3])
 * // => [1, 2]
 * remove(1, 3)([1, 2, 3])
 * // => [2]
 * remove(_ => _ === 3)([1, 2, 3])
 * // => [1, 2]
 */
test("array::remove", t => {
  t.deepEqual(
    remove(_ => _ === 3)([1, 2, 3]),
    [1, 2],
    "Remove existing element from array by match function"
  )

  t.deepEqual(
    remove(3)([1, 2, 3]),
    [1, 2],
    "Remove existing element from array by value"
  )

  t.deepEqual(
    remove(1, 3)([1, 2, 3]),
    [2],
    "Remove multiple elements from array by value"
  )

  const source = [1, 2, 3]

  t.notEqual(remove(3)(source), source, "Imutable")

  t.end()
})
