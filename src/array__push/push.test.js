const test = require( "tape" )
const { push } = require( "./push" )

/**
 * Add element at end of array
 *
 * @param  {mixed}  element  Element to be added
 * @param  {Array}  input    Array to add to
 *
 * @return {Array}  New array with added element
 */
test( "push ( element: mixed ) ( input: Array[mixed] ): Array ", t => {
  t.deepEqual(
    push( null )( [] ),
    [ null ],
    "(null)([]) should equal [null]" )

  t.deepEqual(
    push( undefined )( [] ),
    [ undefined ],
    "(undefined)([]) should equal [undefined]" )

  t.deepEqual(
    push( [] )( [] ),
    [ [] ],
    "([])([]) should equal [[]]" )

  t.deepEqual(
    push( 1, null, undefined )( [] ),
    [ 1, null, undefined ],
    "(1, null, undefined)([]) should equal [1, null, undefined]" )

  t.end()
} )
