/**
 * Get left most element of array
 *
 * @param {Array} input The source
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
export const first = input =>
  (Array.isArray(input) || typeof input === "string") && input.length !== 0
    ? input[0]
    : undefined
