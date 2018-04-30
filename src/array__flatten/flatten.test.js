const test = require( "tape" )
const flatten = require( "./flatten" )

/**
 * Recursively concat all arrays intro a single array
 *
 * @example
 * flatten( [ 1, [ 2 ], [ 3, [ 4 ] ] ] )
 * // => [ 1, 2, 3, 4 ]
 */
test( "array::flatten", t => {
  t.deepEqual(
    flatten( [] ), [],
    "[] should equal []" )

  t.deepEqual(
    flatten( [ [ [] ] ] ), [],
    "[ [ [] ] ] should equal []" )

  t.deepEqual(
    flatten( [ [ [ 1 ] ] ] ), [ 1 ],
    "[ [ [1] ] ] should equal [ 1 ]" )

  t.deepEqual(
    flatten( [ 1, [ 2 ], [ 3, [ 4 ] ] ] ), [ 1, 2, 3, 4 ],
    "[ 1, [2], [3, [4]], [] ] should equal [ 1, 2, 3, 4 ]" )

  t.end()
} )
