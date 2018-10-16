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
test("array::has( value: Function|mixed )( source: Array ): boolean", t => {
  t.deepEqual(has(2)([1, 2]), true, "primitive is in array should return true")

  t.deepEqual(
    has(2)([1, "2"]),
    false,
    "primitive not in array should return false"
  )

  t.equal(
    has(elm => elm.id === 1)([{}, { id: 1 }]),
    true,
    'if iterator function returns "true" than should return true'
  )

  t.equal(
    has(elm => elm.id)([{}, { id: "1" }]),
    false,
    'if iterator function returns anything but "true" than should return false'
  )

  t.end()
})
