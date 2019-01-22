const test = require("tape")
const concat = require("./concat")

/**
 * Merge two or more arrays into one
 *
 * @param {Array}  source1  First array
 * @param {Array}  source2  Second array
 *
 * @returns {Array}
 *
 * @tag Array
 * @signature (source1: Array) => (source2: Array) => Array
 *
 * @example
 * concat([1])([4, 5])
 * // => [1, 4, 5]
 */
test("core::concat", t => {
  t.deepEquals(concat([1, 2])([2, 3]), [1, 2, 2, 3], "Concatenate 2 arrays")
  t.deepEquals(concat([])([]), [], "Concatenate 2 empty arrays")

  t.end()
})
