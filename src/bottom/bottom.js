import { is } from ".."

const bottomX = (limit, source) => {
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
 * @signature (limit: integer) => (source: Array): Array
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
const bottom = (...params) => {
  /*
   * @signature (limit: integer) => (source: Array): Array
   *
   * bottom(2)([1, 2, 3, 4]) => [3, 4]
   */
  if (params.length === 1 && typeof params[0] === "number") {
    const [limit] = params

    return source => bottomX(limit, source)
  }

  /*
   * @signature (source: Array): Array
   *
   * bottom([1, 2, 3, 4]) => [2, 3, 4]
   */
  if (params.length === 1 && typeof params[0] !== "number") {
    const [source] = params

    return bottomX(null, source)
  }

  /*
   * @signature (limit: integer, source: Array): Array
   *
   * bottom(2, [1, 2, 3, 4]) => [3, 4]
   */
  return bottomX(params[0], params[1])
}

export { bottom }
