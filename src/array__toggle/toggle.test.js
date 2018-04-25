const test = require( "tape" )
const toggle = require( "./toggle" )

/**
 * Add element if not exists, remove otherwise
 *
 * @param  {mixed}  element  Toggable value
 *
 * @return {Array}  New array with toggled element
 */
test( "array::toggle( element: mixed )( input: Array[mixed] ): Array", t => {
  t.deepEqual(
    toggle( 2 )( [ 1, 2, 3 ] ),
    [ 1, 3 ],
    "should remove element" )

  t.deepEqual(
    toggle( 2 )( [ 1, "2", 3 ] ),
    [ 1, "2", 3, 2 ],
    "should add element" )

  t.end()
} )
