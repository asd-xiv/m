const test = require( "tape" )
const merge = require( "./merge" )

/**
 * Combine from left to right, 2 or more objects into a single one. Properties
 * with the same name will be overwriten by right most object.
 *
 * @example
 * merge( { a: "lorem" }, { b: "ipsum", c: 41 }, { c: 42 }, {} )
 * // { a: "lorem", b: "ipsum", c: 42 }
 */
test( "object::merge", t => {
  const obj1 = { a: "lorem" }
  const obj2 = { b: "ipsum", c: 41 }
  const obj3 = { c: 42 }
  const obj4 = {}
  const result = merge( obj1, obj2, obj3, obj4 )

  t.deepEqual(
    result, { a: "lorem", b: "ipsum", c: 42 },
    "props of 3 objects should be merged into one" )

  const obj5 = { a: "a" }
  const obj6 = { b: "b" }
  const result2 = merge( obj5, obj6 )

  t.notEqual(
    result2, obj5,
    "result should not equal first input" )

  t.notEqual(
    result2, obj6,
    "result should not equal second input" )

  t.end()
} )
