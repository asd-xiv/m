import { curry } from "../curry/curry"

const _sort = (direction, source) =>
  [...source].sort((a, b) =>
    a === b ? 0 : direction === "asc" ? (a < b ? -1 : 1) : a < b ? 1 : -1
  )

/**
 * Sort primitive array
 *
 * @param {...any} params
 * @param {string} [params.direction="asc"]
 * @param {Array}  params.source
 *
 * @returns {Array}
 *
 * @name sort
 * @tag Array
 * @signature (direction: string, source: Array) => Array
 * @signature (source: Array) => Array
 *
 * @see {@link sortBy}
 * @see {@link sortWith}
 *
 * @example
 * sort([3, 2, 1])
 * // => [1, 2, 3]
 *
 * sort("desc", [1, 2, 3])
 * // => [3, 2, 1]
 */
export const sort = (...params) => {
  // @signature (source)
  if (Array.isArray(params[0])) {
    return _sort("asc", params[0])
  }

  // @signature (direction) => (source)
  if (params.length <= 1) {
    return source => _sort(params[0], source)
  }

  // @signature (direction, source)
  return _sort(...params)
}

/**
 * Sort array using custom function
 *
 * @param {Function} fn     Sort function
 * @param {Array}    source
 *
 * @returns {Array}
 *
 * @name sortBy
 * @tag Array
 * @signature (fn: Function, source: Array) => Array
 *
 * @see {@link sort}
 * @see {@link sortWith}
 *
 * @example
 * sortBy((a, b) => a.id - b.id, [{id: 2}, {id: 1}])
 * // => [{id: 1}, {id: 2}]
 */
export const sortBy = curry((fn, source) => [...source].sort(fn))
