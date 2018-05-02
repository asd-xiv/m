const test = require( "tape" )
const map = require( "./map" )

/**
 * Iterate over an input list, calling `fn` for each element, return a new
 * array
 *
 * @example
 * map( x => x * x )( [ 1, 2, 3 ] )
 * // => [ 1, 4, 9 ]
 */
test( "array::map( ...fn(currentValue, index, array) )( input ): Array", t => {
  const square = value => value * value

  t.deepEqual(
    map( square )( [ 1,2,3 ] ), [ 1, 4, 9 ],
    "(square)([1,2,3]) // => [1,4,9]" )

  t.deepEqual(
    map( square, square )( [ 1,2,3 ] ), [ 1, 16, 81 ],
    "(square,square)([1,2,3]) // => [1,16,82]" )

  t.deepEqual(
    map( square )( [] ), [],
    "iteration over [] should equal []" )

  map( ( currentValue, index, array ) => {
    t.equal(
      currentValue, array[ index ],
      `callback element "${currentValue}" should equal [${array}][${index}]` )

    return currentValue * currentValue
  } )( [ 1, 2 ] )

  t.end()
} )
