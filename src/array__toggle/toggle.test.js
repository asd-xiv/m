const test = require( "tape" )
const toggle = require( "./toggle" )

/**
 * Add element if not exists, remove otherwise
 *
 * @param  {mixed}  element  Toggable value
 *
 * @return {Array}
 *
 * @tag Array
 * @signature ( element: mixed ) => ( input: Array ): Array
 *
 * @example
 * toggle( 1 )( [ 1, 2 ] ) // => [ 2 ]
 * toggle( 1 )( [ 2 ] ) // => [ 1, 2 ]
 */
test( "array::toggle( element )( input )", t => {
  t.deepEqual(
    toggle( 2 )( [ 1, 2, 3 ] ), [ 1, 3 ],
    "(2)([1,2,3]) // should remove element" )

  t.deepEqual(
    toggle( 2 )( [ 1, "2", 3 ] ), [ 1, "2", 3, 2 ],
    "(2)([1,\"2\",3]) // should push element" )

  t.end()
} )
