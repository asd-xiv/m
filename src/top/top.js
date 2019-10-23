/**
 * Get all but last elements of array
 *
 * @param  {Array}  source  The source
 *
 * @return {mixed}
 *
 * @tag Array
 * @signature (source: Array): Array
 *
 * @example
 * top([1, 2, 3])
 * // => [1, 2]
 *
 * top([1])
 * // => []
 *
 * top([])
 * // => []
 */

const top = source => (Array.isArray(source) ? source.slice(0, -1) : [])

export { top }
