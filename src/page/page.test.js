const test = require("tape")
const page = require("./page")

/**
 * Get a subset array using offset and limit
 *
 * @param  {number}  offset  Start position
 * @param  {number}  limit   How many items
 * @param  {Array}   source  Input array
 *
 * @return {Array}
 *
 * @tag Array
 * @signature ({offset: number, limit: number}) => (source: Array) => Array
 *
 * @example
 * page({
 *   offset: 1,
 *   limit: 5
 * })([1, 2, 3, 4, 5, 6, 7, 8])
 * // => [2, 3, 4, 5, 6]
 */
test("array::page", t => {
  t.deepEqual(
    page()([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]),
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    "Page with default"
  )

  t.deepEqual(
    page({ offset: 1, limit: 5 })([1, 2, 3, 4, 5, 6, 7, 8]),
    [2, 3, 4, 5, 6],
    "5 length page starting from position 1"
  )

  t.deepEqual(
    page({ offset: 0, limit: 5 })([1, 2, 3]),
    [1, 2, 3],
    "limit over source lenght"
  )

  t.deepEqual(
    page({ offset: 11, limit: 5 })([1, 2, 3]),
    [],
    "offset over source lenght"
  )

  t.end()
})
