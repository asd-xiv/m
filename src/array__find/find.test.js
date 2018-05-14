const test = require( "tape" )
const find = require( "./find" )

/**
 * Find the first element that satisfies the matchFn
 *
 * @param  {Function}    matchFn Function applied to each element
 * @param  {Array}       source  Source array
 *
 * @return {mixed|undefined}  First element
 *
 * @example
 */
test( "array::find( matchFn: Function )( source: Array ): mixed", t => {
  const comments = [
    { id: 1, body: "" },
    { id: 2, body: "dolor" },
  ]

  t.deepEqual(
    find( element => element.id === 2 )( comments ),
    { id: 2, body: "dolor" },
    "find with id:2 should return found object" )

  t.equal(
    find( element => element.id === 3 )( comments ),
    undefined,
    "find with id:3 should return undefined (not found)" )

  t.end()
} )
