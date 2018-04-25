const test = require( "tape" )
const map = require( "./map" )

/**
 * Iterate over an input list, calling `fn` for each element, return a new
 * array
 *
 * @param  {Function}  fn     The function
 * @param  {Array}     input  Input array
 *
 * @return {Array}
 */
test( "array::map ( ...Fn )( ar ): Array ", t => {
  const squared = value => value * value

  t.deepEqual(
    map( squared )( [ 1, 2, 3 ] ),
    [ 1, 4, 9 ],
    "square of [1,2,3] should equal [1,4,9]" )

  t.end()
} )
