const test = require( "tape" )
const findBy = require( "./find-by" )

/**
 * Find the first element that matches the filter criteria
 *
 * @example
 * const comments = [ { id: 1, body: "" }, { id: 2, body: "dolor" } ]
 *
 * findBy( { id: 2 } )( comments )
 * // => { id: 2, body: "dolor" }
 */
test( "array::findBy( filter: Object )( input: Array ): mixed", t => {
  const comments = [
    { id: 1, body: "" },
    { id: 2, body: "dolor" },
  ]

  t.deepEqual(
    findBy( { id: 2 } )( [] ),
    undefined,
    "find with id:2 in empty array should return undefined" )

  t.deepEqual(
    findBy( { id: 2 } )( comments ),
    { id: 2, body: "dolor" },
    "find with id:2 should return found object" )

  t.equal(
    findBy( { id: 3 } )( comments ),
    undefined,
    "find with id:3 should return undefined (not found)" )

  t.end()
} )
