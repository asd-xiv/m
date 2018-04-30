const test = require( "tape" )
const push = require( "./push" )

/**
 * Add element at end of array
 *
 * @example
 * push( 2 )( [ 1 ] )
 * // => [ 1, 2 ]
 */
test( "array::push( ...elements )( input )", t => {
  t.deepEqual(
    push( null )( [ 1 ] ), [ 1, null ],
    "(null)([]) should equal [null]" )

  t.deepEqual(
    push( undefined )( [] ), [ undefined ],
    "(undefined)([]) should equal [undefined]" )

  t.deepEqual(
    push( [] )( [] ), [ [] ],
    "([])([]) should equal [[]]" )

  t.deepEqual(
    push( 1, null, undefined )( [] ), [ 1, null, undefined ],
    "(1, null, undefined)([]) should equal [1, null, undefined]" )

  t.throws( () => {
    push( "new element at the back" )( 2 )
  }, /^TypeError: Expected "input" to be "Array"/,
  "parameter \"input\" should be of type \"Array\"" )

  t.end()
} )
