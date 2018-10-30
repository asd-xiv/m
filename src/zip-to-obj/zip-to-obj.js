/**
 * Create an object from two arrays, one containing keys, the other values.
 * Bost arrays will be trimmed to the smallest length.
 *
 * @param  {Array}  keys    Array with keys
 * @param  {Array}  values  Array with values
 *
 * @return {Object}
 *
 * @tag Array
 * @signature ( keys: Array ) => ( values: Array ): Object
 *
 * @example
 * zipToObj( [ a, b ] )( [ 1, 2 ] ) // => { a: 1, b: 2 }
 * zipToObj( [ a ] )( [ 1, 2 ] ) // => { a: 1 }
 */
module.exports = keys => values => {
  const result = {}
  const length = Math.min(keys.length, values.length)

  for (let i = 0; i < length; i++) {
    result[keys[i]] = values[i]
  }

  return result
}
