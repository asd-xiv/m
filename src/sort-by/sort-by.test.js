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
test("array::sortBy", t => {
  const source = [
    { id: 5, position: null },
    { id: 3 },
    { id: 1, position: 3 },
    { id: 2, position: 2 },
    { id: 4, position: 5 },
  ]

  t.notEqual(sortBy("position")(source), source, "Imutable")

  t.deepEqual(
    sortBy("position")(sortBy("position")(source)),
    [
      { id: 2, position: 2 },
      { id: 1, position: 3 },
      { id: 4, position: 5 },
      { id: 5, position: null },
      { id: 3 },
    ],
    "Idempotent"
  )

  t.deepEqual(
    sortBy("position")(source),
    [
      { id: 2, position: 2 },
      { id: 1, position: 3 },
      { id: 4, position: 5 },
      { id: 5, position: null },
      { id: 3 },
    ],
    "Sort asc by field with undefined at bottom"
  )

  t.deepEqual(
    sortBy("position", "desc")(source),
    [
      { id: 4, position: 5 },
      { id: 1, position: 3 },
      { id: 2, position: 2 },
      { id: 5, position: null },
      { id: 3 },
    ],
    "Sort desc by field with undefined at bottom"
  )

  t.end()
})
