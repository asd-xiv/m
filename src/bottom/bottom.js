import { is } from "../is/is"

const _bottom = (limit, source) => {
  if (
    (!Array.isArray(source) && typeof source !== "string") ||
    source.length <= 1
  ) {
    return []
  }

  return source.slice(
    is(limit) ? (limit >= source.length ? 0 : source.length - limit) : 1
  )
}

/**
 * Get all but first element from array
 *
 * @param {integer} limit  How many elements from the bottom
 * @param {Array}   source The source
 *
 * @return {mixed}
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
    return source => _bottom(params[0], source)
  }

  // @signature (source: Array): Array
  if (params.length === 1 && typeof params[0] !== "number") {
    return _bottom(null, params[0])
  }

  // @signature (limit: integer, source: Array): Array
  return _bottom(...params)
}
