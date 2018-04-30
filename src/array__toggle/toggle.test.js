const test = require( "tape" )
const toggle = require( "./toggle" )

/**
 * Push element if not exists, remove otherwise
 *
 * @example
 * toggle( 2 )( [ 1, 2, 3 ] )
 * // => [ 1, 3 ]
 *
 * toggle( 2 )( [ 1, "2", 3 ] )
 * // => [ 1, "2", 3, 2 ]
 */
test( "array::toggle( element )( input )", t => {
  t.deepEqual(
    toggle( 2 )( [ 1, 2, 3 ] ), [ 1, 3 ],
    "(2)([1,2,3]) // should remove element" )

  t.deepEqual(
    toggle( 2 )( [ 1, "2", 3 ] ), [ 1, "2", 3, 2 ],
    "(2)([1,\"2\",3]) // should push element" )

  t.throws( () => {
    toggle( 2 )( {} )
  }, /^TypeError: Expected "input" to be "Array"/,
  "(2)({}) // parameter \"input\" should be of type \"Array\"" )

  t.end()
} )
