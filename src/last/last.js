/**
 * Get right most element of array
 *
 * @param {Array} source The source
 *
 * @returns {any}
 *
 * @name last
 * @tag Array
 * @signature (source: Array): mixed
 *
 * @example
 * last([1, 2, 3])
 * // => 3
 * last([])
 * // => undefined
 */
const last = source =>
  (Array.isArray(source) || typeof source === "string") && source.length !== 0
    ? source[source.length - 1]
    : undefined

export { last }
