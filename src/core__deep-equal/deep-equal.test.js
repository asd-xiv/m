const test = require( "tape" )
const deepEqual = require( "./deep-equal" )

test( "core::deepEqual( alice: mixed )( bob: mixed ): boolean", t => {
  t.equal(
    deepEqual( 1 )( 1 ), true,
    "Primitives: 1 === 1" )

  t.equal(
    deepEqual( 1 )( "3" ), false,
    "Primitives: 1 !== \"3\"" )

  const fn = () => {}

  t.equal(
    deepEqual( fn )( fn ), true,
    "Functions: fn === fn" )

  t.equal(
    deepEqual( new RegExp( "test", "gu" ) )( new RegExp( "test" ) ), false,
    "RegExp: /test/gu !== /test/" )

  t.equal(
    deepEqual( new RegExp( "test", "gu" ) )( new RegExp( "test", "ug" ) ), true,
    "RegExp: /test/gu === /test/ug" )

  t.equal(
    deepEqual( [ 1, 2, 3 ] )( [ 2, 1 ] ), false,
    "Array: [1, 2, 3] !== [2, 1]" )

  t.equal(
    deepEqual( [ 1, 2 ] )( [ 2, 1 ] ), false,
    "Array: [1, 2] !== [2, 1]" )

  t.equal(
    deepEqual( [ 1, "2" ] )( [ 2, 1 ] ), false,
    "Array: [1, \"2\"] !== [2, 1]" )

  t.equal(
    deepEqual( { a: 2, b: 3 } )( { b: 3, a: 2 } ), true,
    "Object: {a: 2, b: 3} === {b: 3, a: 2}" )

  t.equal(
    deepEqual( { a: 2, b: 3 } )( { b: 3, a: 1 } ), false,
    "Object: {a: 2, b: 3} !== {b: 3, a: 1}" )

  t.equal(
    deepEqual( {
      lvl1: {},
      lvl2: { a: [ 1 ], b: 3 },
    } )( {
      lvl1: {},
      lvl2: { b: 3, a: [ 1 ] },
    } ), true,
    "Object: recursive check success" )

  t.equal(
    deepEqual( {
      "lvl1"  : [ 1,2,3 ],
      "lvl1-1": { a: [ 1,2 ], b: 3 },
    } )( {
      "lvl1-1": { a: [ 1,2 ], b: {} },
      "lvl1"  : [ 1,2,3 ],
    } ), false,
    "Object: recursive check fail" )

  t.equal(
    deepEqual( { 1: 2, 2: 3 } )( [ 2, 1 ] ), false,
    "Type checks: {1: 2, 2: 3} !== [2, 1]" )

  t.equal(
    deepEqual( new RegExp( "test" ) )( [ 2, 1 ] ), false,
    "Type checks: /test/ !== [2, 1]" )

  t.end()
} )
