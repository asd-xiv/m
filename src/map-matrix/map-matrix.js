import { pipe } from "../pipe/pipe"

const _mapMatrix = (fn, source) => {
  const result = []

  for (let i = 0, rowCount = source.length; i < rowCount; ++i) {
    const row = []

    for (let j = 0, columnCount = source[i].length; j < columnCount; ++j) {
      row.push(
        Array.isArray(fn)
          ? pipe(...fn)(source[i][j])
          : fn(source[i][j], i, j, source)
      )
    }

    result.push(row)
  }

  return result
}

/**
 * Matrix version of "map". Iterates over a two-dimensional array and applies
 * a function on each element, returning a new matrix with the transformed elements.
 *
 * @param  {Fn|Fn[]} fn     Transform function called on all elements
 * @param  {[][]}    source Two-dimensional array to iterate over
 *
 * @tag Array
 * @signature (fn: Fn|Fn[]) => (source: [][]) => [][]
 * @signature (fn: Fn|Fn[], source: [][]) => [][]
 *
 * @return {[][]} Returns new instance
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
  /*
   * @signature (fn:Fn|Fn[]) => (source: [][]): [][]
   *
   * mapMatrix(inc)([[1, 2], [3, 4]])
   * // => [[2, 3], [4, 5]]
   */
  if (params.length === 1) {
    return source => _mapMatrix(params[0], source)
  }

  /*
   * @signature (fn: Fn|Fn[], source: [][]): [][]
   *
   * mapMatrix(inc, [[1, 2], [3, 4]])
   * // => [[2, 3], [4, 5]]
   */
  return _mapMatrix(...params)
}
