const test = require("tape")
const repeat = require("./repeat")

/**
 * Return an array of fixed size containing a specified value or function result
 *
 * @tag Array
 * @signature (fn: Function|mixed) => (count:number): Array
 *
 * @param  {Function|mixed}  fn     Function or value to repeat
 * @param  {number}          count  Number of times
 *
 * @return {Array}
 *
 * @example
 * repeat(2)(3)
 * // => [2, 2, 2]
 * repeat(index=>index+1)(3)
 * // => [1, 2, 3]
 */
test("array::repeat( fn: Function ) => ( count: number ): Array", t => {
  t.deepEqual(
    repeat(index => index + 2)(5),
    [2, 3, 4, 5, 6],
    "Repeat custom function 5 times should return array with 5 elements"
  )

  t.deepEqual(
    repeat(index => index + 2)(0),
    [],
    "Repeat custom function 0 times should return empty array"
  )

  t.deepEqual(
    repeat(3)(2),
    [3, 3],
    "Repeat custom function 2 times should return array with 2 elements with the same value"
  )

  t.end()
})
