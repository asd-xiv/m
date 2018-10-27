/**
 * Get left most element of array
 *
 * @param  {Array}  source  The source
 *
 * @return {mixed}
 *
 * @tag Array
 * @signature (source: Array): mixed
 *
 * @example
 * head([1, 2, 3])
 * // => 1
 * head([])
 * // => null
 */
module.exports = source => (source.length === 0 ? null : source[0])
