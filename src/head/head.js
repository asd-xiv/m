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
 * // => undefined
 */
const head = source =>
  Array.isArray(source) && source.length !== 0 ? source[0] : undefined

export { head }
