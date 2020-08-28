import { pipe } from "../pipe/pipe"

const _mapMatrix = (_fn, source) => {
  const result = []
  const fn = Array.isArray(_fn) ? pipe(..._fn) : _fn

  for (let i = 0, rowCount = source.length; i < rowCount; ++i) {
    const row = []

    for (let j = 0, columnCount = source[i].length; j < columnCount; ++j) {
      row.push(fn(source[i][j], i, j, source))
    }

    result.push(row)
  }

  return result
}

/**
 * Matrix version of "map". Iterates over a two-dimensional array and applies
 * a function on each element, returning a new matrix with the transformed
 * elements.
 *
 * @param {Fn|Fn[]} fn     Transform function called on all elements
 * @param {[][]}    source Two-dimensional array to iterate over
 *
 * @name mapMatrix
 * @tag Array
 * @signature (fn: Fn|Fn[]) => (source: [][]) => [][]
 * @signature (fn: Fn|Fn[], source: [][]) => [][]
 *
 * @return {[][]} New array instance
 *
 * @example
 * const inc = x => x + 1
 *
 * mapMatrix(inc, [[1, 2], [3, 4]])
 * // => [[2, 3], [4, 5]]
 *
 * mapMatrix([inc, inc], [[1, 2], [3, 4]])
 * // => [[3, 4], [5, 6]]
 */
export const mapMatrix = (...params) => {
  // @signature (fn) => (source)
  if (params.length <= 1) {
    return source => _mapMatrix(params[0], source)
  }

  // @signature (fn, source)
  return _mapMatrix(...params)
}
