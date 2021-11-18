import { curry } from "../curry/curry.js"
import { pipe } from "../pipe/pipe.js"

const _mapMatrix = (_fn, input) => {
  const result = []
  const fn = Array.isArray(_fn) ? pipe(..._fn) : _fn

  for (
    let rowIndex = 0, rowCount = input.length;
    rowIndex < rowCount;
    ++rowIndex
  ) {
    const row = []

    for (
      let columnIndex = 0, columnCount = input[rowIndex].length;
      columnIndex < columnCount;
      ++columnIndex
    ) {
      row.push(fn(input[rowIndex][columnIndex], rowIndex, columnIndex, input))
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
 * @param {Function|Function[]} fn    Transform function called on all elements
 * @param {any[][]}             input Two-dimensional array to iterate over
 *
 * @returns {any[][]} New array instance
 *
 * @name mapMatrix
 * @tag Array
 * @signature (fn: Fn|Fn[]) => (input: [][]) => [][]
 * @signature (fn: Fn|Fn[], input: [][]) => [][]
 *
 * @see {@link map}
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
export const mapMatrix = curry(_mapMatrix)
