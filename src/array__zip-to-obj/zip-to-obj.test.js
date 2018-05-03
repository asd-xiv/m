const test = require( "tape" )
const zipToObj = require( "./zip-to-obj" )

test( "array::zipToObj", t => {
  t.deepEquals(
    zipToObj( [ "a", "b" ] )( [ 1, 2 ] ), { a: 1, b: 2 },
    "arrays with same size should form object"
  )

  t.deepEquals(
    zipToObj( [ "a" ] )( [ 1, 2 ] ), { a: 1 },
    "arrays with less keys than values should form object"
  )

  t.deepEquals(
    zipToObj( [ "a", "b" ] )( [ 2 ] ), { a: 2 },
    "arrays with less values than keys should form object"
  )

  t.end()
} )
