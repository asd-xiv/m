/**
 * Get right most element of array
 *
 * @param  {Array}  source  The source
 *
 * @return {mixed}
 *
 * @tag Array
 * @signature (source: Array): mixed
 *
 * @example
 * tail([1, 2, 3])
 * // => 3
 * tail([])
 * // => null
 */
module.exports = source =>
  Array.isArray(source) && source.length !== 0
    ? source[source.length - 1]
    : null
