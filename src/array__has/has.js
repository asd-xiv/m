/**
 * Check if value is in array
 *
 * @param   {mixed}    value  What to search for
 * @param   {Array}    input  Haystack
 *
 * @return  {boolean}  True if has, false otherwise
 *
 * @example
 *
 * has( 2 )( [ 1, 2 ] ) // true
 * has( 3 )( [ 1, 2 ] ) // false
 */
const has = value => array =>
  array.indexOf( value ) !== -1

module.exports = {
  has,
}
