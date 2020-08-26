import { pipe } from "../pipe/pipe"

const _mapMatrix = (fn, source) => {
  const result = []

  for (let i = 0; i < source.length; ++i) {
    const row = []

    for (let j = 0; j < source[i].length; ++j) {
      const value = source[i][j]

      row.push(Array.isArray(fn) ? pipe(...fn)(value) : fn(value, i, j, source))
    }

    result.push(row)
  }

  return result
}

/**
 * Two-Dimensional version of Array.map
 *
 * Takes a function and applies it to all elements of the matrix.
 *
 * @param {Function} fn     Function to be called on all elements
 * @param {[][]}     source Matrix to be iterated over
 *
 * @return {[][]} Returns new instance
 */
export const mapMatrix = (...params) => {
  /*
   * @signature (fn) => (source: [][]): [][]
   *
   * mapMatrix(x => x + 1)([[1, 2], [3, 4]]) => [[2, 3], [4, 5]]
   */
  if (params.length === 1) {
    return source => _mapMatrix(params[0], source)
  }

  /*
   * @signature (fn, source: [][]): [][]
   *
   * mapMatrix(x => x + 1, [[1, 2], [3, 4]]) => [[2, 3], [4, 5]]
   */
  return _mapMatrix(...params)
}
