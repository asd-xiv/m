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
const tail = source => (source.length === 0 ? null : source[source.length - 1])

export { tail }
