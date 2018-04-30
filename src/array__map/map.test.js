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
test( "array::map( fn )( input ): Array", t => {
  const squared = value => value * value

  t.deepEqual(
    map( squared )( [ 1, 2, 3 ] ), [ 1, 4, 9 ],
    "square of [1,2,3] should equal [1,4,9]" )

  t.deepEqual(
    map( squared )( [] ), [],
    "iteration over [] should equal []" )

  t.throws( () => {
    map( "asd" )( [] )
  }, /^TypeError: Expected "fn" to be "Function"/,
  "parameter \"fn\" should be of type \"Function\"" )

  t.throws( () => {
    map( () => {} )( {} )
  }, /^TypeError: Expected "input" to be "Array"/,
  "parameter \"input\" should be of type \"Array\"" )

  t.end()
} )
