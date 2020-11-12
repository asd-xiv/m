const topX = (limit, source) =>
  Array.isArray(source) || typeof source === "string"
    ? source.slice(0, limit ?? -1)
    : []

/**
 * Get all but last element from array
 *
 * @param {integer} limit  How many elements from the top
 * @param {Array}   source The source
 * @param {...any}  params Function params
 *
 * @returns {mixed}
 *
 * @tag Array
 * @signature (limit: integer, source: Array): Array
 * @signature (limit: integer) => (source: Array): Array
 * @signature (source: Array): Array
 *
 * @example
 * top([1, 2, 3])
 * // => [1, 2]
 *
 * top([1]), top([])
 * // => []
 *
 * top(2, [2, 3])
 * // => [2, 3]
 *
 * top(2)([1, 2, 3])
 * // => [2, 3]
 */
const top = (...params) => {
  /*
   * @signature (limit: integer) => (source: Array): Array
   *
   * top(2)([1, 2, 3, 4]) => [3, 4]
   */
  if (params.length === 1 && typeof params[0] === "number") {
    const [limit] = params

    return source => topX(limit, source)
  }

  /*
   * @signature (source: Array): Array
   *
   * top([1, 2, 3, 4]) => [2, 3, 4]
   */
  if (params.length === 1 && typeof params[0] !== "number") {
    const [source] = params

    return topX(null, source)
  }

  /*
   * @signature (limit: integer, source: Array): Array
   *
   * top(2, [1, 2, 3, 4]) => [3, 4]
   */
  return topX(params[0], params[1])
}

export { top }
