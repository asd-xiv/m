const test = require("tape")
const filterBy = require("./filter-by")

/**
 * Filter an array of objects
 *
 * @tag Array
 * @signature (matchObject: Object) => (source: Object[]): Object[]
 *
 * @param   {Object}  matchObject  Match object
 *
 * @return  {Object[]} Array of objects that match the filter criteria
 *
 * @example { example }
 *
 * filterBy( { "!id": 2 } )( [
 *   { lorem: 2 },
 *   { lorem: 3 },
 *   { id: 2 }
 * ] )
 * // [
 * // { lorem: 2 },
 * // { lorem: 3 }
 * // ]
 *
 * filterBy( { "items": 2 } )( [
 *   { id: 2, items: 2 },
 *   { id: 3, items: 1 },
 *   { id: 4, items: 2 }
 * ] )
 * // [
 * // { id: 2, items: 2 },
 * // { id: 4, items: 2 }
 * // ]
 */
test("filterBy::(matchObject: Object) => (source: Object[]): Object[]", t => {
  t.deepEqual(
    filterBy({
      items: 2,
    })([{ id: 2, items: 2 }, { id: 3, items: 1 }, { id: 4, items: 2 }]),
    [{ id: 2, items: 2 }, { id: 4, items: 2 }],
    "Keep items in array that have properties that equal"
  )

  t.deepEqual(
    filterBy({
      "!id": 2,
    })([{ lorem: 2 }, { lorem: 3 }, { id: 2 }]),
    [{ lorem: 2 }, { lorem: 3 }],
    "Keep items in array that have properties that dont equal"
  )

  t.end()
})
