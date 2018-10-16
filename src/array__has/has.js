/**
 * Determines if it has by function
 *
 * @param  {Function}  fn      The function
 * @param  {Array}     source  The source
 *
 * @return {boolean}   True if has by function, False otherwise.
 */
const hasByFunction = (fn, source) => {
  for (let i = 0, length = source.length; i < length; i++) {
    if (fn.call(null, source[i]) === true) {
      return true
    }
  }

  return false
}

/**
 * Determines if it has by value
 *
 * @param  {mixed}    value   The value
 * @param  {array}    source  The source
 *
 * @return {boolean}  True if has by value, False otherwise.
 */
const hasByValue = (value, source) => {
  for (let i = 0, length = source.length; i < length; i++) {
    if (value === source[i]) {
      return true
    }
  }

  return false
}

/**
 * Check if value is in array
 *
 * @param   {mixed}    value   What to search for
 * @param   {Array}    source  Haystack
 *
 * @return  {boolean}  True if has, false otherwise
 *
 * @tag Array
 * @signature (value: Function|mixed )( source: Array ): boolean
 *
 * @example
 * has( 2 )( [ 1, 2 ] )
 * // => true
 * has( 3 )( [ 1, 2 ] )
 * // => false
 * has( elm => elm.id === 1 )([{}, {id: 1}])
 * // => true
 */
module.exports = value => source =>
  typeof value === "function"
    ? hasByFunction(value, source)
    : hasByValue(value, source)
