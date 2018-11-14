const test = require("tape")
const reduce = require("./reduce")

/**
 * Apply a function against an accumulator and each  element in the array (from
 * left to right) to reduce it to a single value.
 *
 * @param  {Function}  fn          Reduce function
 * @param  {Object}    defaultAcc  The default acc
 * @param  {Array}     source      Source input
 *
 * @return {Array}
 *
 * @tag Array
 * @signature (fn: Function, defaultAcc: mixed) => (source: Array): Array
 */
test("reduce", t => {
  t.equals(reduce((acc, next) => acc + next, 0)([1, 2, 3]), 6, "Sum an array")

  t.equals(
    reduce((acc, next) => acc + next, 0)(12),
    12,
    "Run even if input is not array, treat it as array of one"
  )

  t.equals(
    reduce((acc = 0, next) => acc + next)([1, 2, 3]),
    6,
    "Sum an array with the initial acc left undefined in the reduce function but set as default value in the param"
  )

  t.deepEquals(
    reduce((acc, next) => ({ ...acc, [next]: next }), {})([1, 2, 3]),
    { 1: 1, 2: 2, 3: 3 },
    "From array to object with default acc"
  )

  t.end()
})
