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
module.exports = (fn, defaultAcc = {}) => source => {
  let acc = defaultAcc

  for (let i = 0, length = source.length; i < length; i++) {
    acc = fn(acc, source[i], i, source)
  }

  return acc
}
