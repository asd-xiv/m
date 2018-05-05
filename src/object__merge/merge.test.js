const test = require( "tape" )
const merge = require( "./merge" )

/**
 * Combine from left to right, 2 or more objects into a new single one.
 * Properties will be shallow copied. Those with the same name will be
 * overwriten by right most object.
 *
 * @tag Object
 * @signature ( ...source: Object[] ): Object
 *
 * @param   {Object[]}  source  Array of objects
 *
 * @return  {Object}
 *
 * @example
 * merge({a: "lorem"}, {b: "ipsum", c: 41}, {c: 42})
 * // => { a: "lorem", b: "ipsum", c: 42 }
 */
test( "object::merge( ...source: Object[] ): Object", t => {
  const obj1 = { a: "lorem" }
  const obj2 = { b: "ipsum", c: 41 }
  const obj3 = { c: 42 }
  const result = merge( obj1, obj2, obj3 )

  t.deepEqual(
    result, { a: "lorem", b: "ipsum", c: 42 },
    "3 objects should be merged into one" )

  t.notEqual(
    result, obj1,
    "result should not equal first obj" )

  t.notEqual(
    result, obj2,
    "result should not equal second obj" )

  t.end()
} )
