/**
 * Find the minimum value in a source array
 *
 * @param  {number[]}  source  Array of numbers
 *
 * @return {number}
 *
 * @tag Array
 * @signature ( source: Number[] ): Number
 *
 * @example
 * min([-1, 1, 10, 3])
 * // => -1
 */
module.exports = source => {
  let minValue = 0

  if ( source.length === 0 ) {
    return 0
  }

  for ( let i = 0, length = source.length; i < length; i++ ) {
    if ( minValue > source[ i ] ) {
      minValue = source[ i ]
    }
  }

  return minValue
}

