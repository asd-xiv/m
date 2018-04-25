/**
 * Apply a function against an accumulator and each  element in the array (from
 * left to right) to reduce it to a single value.
 *
 * @param  {Function}  fn          Reduce function
 * @param  {Object}    defaultAcc  The default acc
 *
 * @return {Function}  { description_of_the_return_value }
 */
module.exports = ( fn, defaultAcc = {} ) => input => {
  let acc = defaultAcc

  for ( let i = 0, length = input.length; i < length; i++ ) {
    acc = fn( acc, input[ i ], i, input )
  }

  return acc
}
