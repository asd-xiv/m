const test = require( "tape" )
const findBy = require( "./find-by" )

test( "array::findBy( filter: Object )( input: Array ): mixed", t => {
  const comments = [
    { id: 1, body: "" },
    { id: 2, body: "dolor" },
  ]

  t.deepEqual(
    findBy( { id: 2 } )( comments ),
    { id: 2, body: "dolor" },
    "find with id:2 should return found object" )

  t.equal(
    findBy( { id: 3 } )( comments ),
    undefined,
    "find with id:3 should return undefined (not found)" )

  t.throws( () => {
    findBy( "wrong" )( [] )
  }, /^TypeError: Expected "filter" to be "Object"/,
  "parameter \"filter\" should be of type \"Object\"" )

  t.throws( () => {
    findBy( { id: 2 } )( {} )
  }, /^TypeError: Expected "input" to be "Array"/,
  "parameter \"input\" should be of type \"Array\"" )

  t.end()
} )
