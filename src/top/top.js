/* eslint-disable jsdoc/check-param-names,jsdoc/require-param */

import { is } from "../is/is"

const topX = (limit, source) =>
  Array.isArray(source) || typeof source === "string"
    ? source.slice(0, is(limit) ? limit : -1)
    : []

/**
 * Get all but last element from array
 *
 * @param {number} [limit=1] Item count
 * @param {Array}  source
 *
 * @returns {any}
 *
 * @name top
 * @tag Array
 * @signature (limit: number, source: Array): Array
 * @signature (limit: number) => (source: Array): Array
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
   * @signature (limit: number) => (source: Array): Array
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
  if (params.length === 1) {
    const [source] = params

    return topX(undefined, source)
  }

  /*
   * @signature (limit: number, source: Array): Array
   *
   * top(2, [1, 2, 3, 4]) => [3, 4]
   */
  return topX(params[0], params[1])
}

export { top }
