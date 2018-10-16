const test = require("tape")
const sortBy = require("./sort-by")

/**
 * Sort an array of objects by a custom field
 *
 * @tag Array
 * @signature ( field: string, direction: string ) => ( source: Array ): Array
 *
 * @param  {string}  field      Sort field name
 * @param  {string}  direction  Sort direction
 * @param  {Array}   source     Input array
 *
 * @return {Array}
 *
 * @example
 * sortBy( "position" )( [
 *   { id: 1, position: 3 },
 *   { id: 2, position: 2 },
 *   { id: 3 },
 *   { id: 4, position: 5 },
 *   { id: 5, position: null },
 * ] )
 * // [
 * //  { id: 2, position: 2 },
 * //  { id: 1, position: 3 },
 * //  { id: 4, position: 5 },
 * //  { id: 5, position: null },
 * //  { id: 3 },
 * //]
 */
test("array::sortBy( field: string, direction: string ) => ( source: Array ): Array", t => {
  const source = [
    { id: 5, position: null },
    { id: 3 },
    { id: 1, position: 3 },
    { id: 2, position: 2 },
    { id: 4, position: 5 },
  ]
  const expected = [
    { id: 2, position: 2 },
    { id: 1, position: 3 },
    { id: 4, position: 5 },
    { id: 5, position: null },
    { id: 3 },
  ]

  t.notEqual(
    sortBy("position")(source),
    source,
    "Does not mutate initial object"
  )

  t.deepEqual(
    sortBy("position")(source),
    expected,
    "Sort by field with undefined at bottom"
  )

  t.end()
})
