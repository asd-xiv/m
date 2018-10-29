const test = require("tape")
const toggle = require("./toggle")

/**
 * Add element if not exists, remove otherwise
 *
 * @param  {mixed}  element  Toggable value
 *
 * @return {Array}
 *
 * @tag Array
 * @signature (element: mixed) => (source: Array): Array
 *
 * @example
 * toggle( 1 )( [ 1, 2 ] )
 * // => [ 2 ]
 * toggle( 1 )( [ 2 ] )
 * // => [ 1, 2 ]
 */
test("array::toggle", t => {
  t.deepEqual(
    toggle(2)([1, 2, 3]),
    [1, 3],
    "Toggle/remove existing element in array"
  )

  t.deepEqual(
    toggle(2)([1, "2", 3]),
    [1, "2", 3, 2],
    "Toggle/add non-existing element in array"
  )

  t.deepEqual(toggle(2)([]), [2], "Toggle/add element in empty array")

  t.end()
})
