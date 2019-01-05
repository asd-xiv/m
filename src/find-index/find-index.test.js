const test = require("tape")
const findIndex = require("./find-index")

/**
 * Find the position of first element that satisfies a function
 *
 * @param  {Function}    fn      Match function
 * @param  {Object[]}    source  Source array
 *
 * @return {number}
 *
 * @name findIndex
 * @tag Array
 * @signature (fn: Function) => (source: Object[]): number
 *
 * @example
 * const comments = [{ id: 1, body: "" }, { id: 2, body: "dolor" }]
 *
 * findIndex(item => item.id === 2)(comments)
 * // => 1
 * findIndex(item => item.id === 3)(comments)
 * // => -1
 */
test("array::findIndex", t => {
  const comments = [{ id: 1, body: "" }, { id: 2, body: "dolor" }]

  t.equals(
    findIndex(element => element.id === 2)(comments),
    1,
    "index with id:2 should be 1"
  )

  t.equals(
    findIndex(element => element.id === 3)(comments),
    -1,
    "index with id:3 should be -1 (not found)"
  )

  t.end()
})
