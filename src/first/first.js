/**
 * Get left most element of array
 *
 * @param {Array} source The source
 *
 * @returns {any}
 *
 * @tag Array
 * @signature (source: Array): mixed
 *
 * @example
 * first([1, 2, 3])
 * // => 1
 *
 * first([])
 * // => undefined
 */
export const first = source =>
  (Array.isArray(source) || typeof source === "string") && source.length !== 0
    ? source[0]
    : undefined
