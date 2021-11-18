/**
 * Get right most element of array
 *
 * @param {Array} input The source
 *
 * @returns {any}
 *
 * @name last
 * @tag Array
 * @signature (input: Array): mixed
 *
 * @example
 * last([1, 2, 3])
 * // => 3
 * last([])
 * // => undefined
 */
const last = input =>
  (Array.isArray(input) || typeof input === "string") && input.length !== 0
    ? input[input.length - 1]
    : undefined

export { last }
