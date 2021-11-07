import { is } from "../is/is.js"

const _bottom = (limit, input) => {
  if (
    (!Array.isArray(input) && typeof input !== "string") ||
    input.length <= 1
  ) {
    return []
  }

  return input.slice(
    is(limit) ? (limit >= input.length ? 0 : input.length - limit) : 1
  )
}

/**
 * Get all but first element from array
 *
 * @param {number} limit  How many elements from the bottom
 * @param {Array}  source The source
 * @param {...any} params
 *
 * @returns {any}
 *
 * @tag Array
 * @signature (limit: integer, source: Array): Array
 * @signature (source: Array): Array
 *
 * @example
 * bottom([1, 2, 3])
 * // => [1, 2]
 *
 * bottom([1]), bottom([])
 * // => []
 *
 * bottom(2, [2, 3])
 * // => [2, 3]
 *
 * bottom(2)([1, 2, 3])
 * // => [2, 3]
 */
export const bottom = (...params) => {
  // @signature (limit: Integer) => (source: Array): Array
  if (params.length === 1 && typeof params[0] === "number") {
    return input => _bottom(params[0], input)
  }

  // @signature (source: Array): Array
  if (params.length === 1 && typeof params[0] !== "number") {
    return _bottom(undefined, params[0])
  }

  // @signature (limit: integer, source: Array): Array
  return _bottom(...params)
}
