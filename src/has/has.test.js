const test = require("tape")
const has = require("./has")

/**
 * Check if value is in array
 *
 * @param   {mixed}    value   What to search for
 * @param   {Array}    source  Haystack
 *
 * @return  {boolean}  True if has, false otherwise
 *
 * @tag Array
 * @signature (value: Function|mixed )( source: Array ): boolean
 *
 * @example
 * has( 2 )( [ 1, 2 ] )
 * // => true
 * has( 3 )( [ 1, 2 ] )
 * // => false
 * has( elm => elm.id === 1 )([{}, {id: 1}])
 * // => true
 */
test("array::has", t => {
  t.equals(has(2)([1, 2]), true, "Primitive exists in array")
  t.equals(has(2)([1, "2"]), false, "Primitive does not exist in array")

  t.equals(
    has(elm => elm.id === 1)([{}, { id: 1 }]),
    true,
    "Has element with custom function that returns true"
  )
  t.equals(
    has(elm => elm.id)([{}, { id: "1" }]),
    false,
    "Has element with custom function that does not return true"
  )

  t.equals(has(2)([]), false, "Has value in empty array")

  t.end()
})
