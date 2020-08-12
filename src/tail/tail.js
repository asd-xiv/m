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
 * // => undefined
 */
const tail = source =>
  (Array.isArray(source) || typeof source === "string") && source.length !== 0
    ? source[source.length - 1]
    : undefined

export { tail }
