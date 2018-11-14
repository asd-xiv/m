/**
 * Apply a function against an accumulator and each  element in the array (from
 * left to right) to reduce it to a single value.
 *
 * @param  {Function}  fn          Reduce function
 * @param  {Object}    defaultAcc  The default acc
 * @param  {Array}     source      Source input
 *
 * @return {mixed}
 *
 * @tag Array
 * @signature (fn: Function, defaultAcc: mixed) => (source: Array): mixed
 */
module.exports = (fn, defaultAcc) => source => {
  let acc = defaultAcc
  const sourceArray = Array.isArray(source) ? source : [source]

  for (let i = 0, length = sourceArray.length; i < length; i++) {
    acc = fn(acc, sourceArray[i], i, sourceArray)
  }

  return acc
}
