import type { AnyMorphism, Morphism } from "../../../types/function.js"
import type {
  PipeMorphisms1,
  PipeMorphisms2,
  PipeMorphisms3,
  PipeMorphisms4,
} from "../../pipe/pipe.js"

import { type } from "../../type/type.js"
import { _toFunction } from "../../utils/to-function.js"

type MatrixMorphism<I, O> = Morphism<
  [
    item: I,
    rowIndex: number,
    columnIndex: number,
    matrix: readonly (readonly I[])[],
  ],
  O
>

type MapMatrixFn = {
  // Morphism pipe overloads (most specific first, least common)
  <T1, T2, T3, T4, T5>(
    fns: PipeMorphisms4<T1, T2, T3, T4, T5>,
    input: readonly (readonly T1[])[]
  ): T5[][]
  <T1, T2, T3, T4, T5>(
    fns: PipeMorphisms4<T1, T2, T3, T4, T5>
  ): (input: readonly (readonly T1[])[]) => T5[][]

  <T1, T2, T3, T4>(
    fns: PipeMorphisms3<T1, T2, T3, T4>,
    input: readonly (readonly T1[])[]
  ): T4[][]
  <T1, T2, T3, T4>(
    fns: PipeMorphisms3<T1, T2, T3, T4>
  ): (input: readonly (readonly T1[])[]) => T4[][]

  <T1, T2, T3>(
    fns: PipeMorphisms2<T1, T2, T3>,
    input: readonly (readonly T1[])[]
  ): T3[][]
  <T1, T2, T3>(
    fns: PipeMorphisms2<T1, T2, T3>
  ): (input: readonly (readonly T1[])[]) => T3[][]

  <T1, T2>(
    fns: PipeMorphisms1<T1, T2>,
    input: readonly (readonly T1[])[]
  ): T2[][]
  <T1, T2>(
    fns: PipeMorphisms1<T1, T2>
  ): (input: readonly (readonly T1[])[]) => T2[][]

  // Single morphism (most common, last so error messages reference this)
  <I, O>(fn: MatrixMorphism<I, O>, input: readonly (readonly I[])[]): O[][]
  <I, O>(fn: MatrixMorphism<I, O>): (input: readonly (readonly I[])[]) => O[][]
}

const _mapMatrix = (fn: AnyMorphism, input: unknown): unknown[][] => {
  if (!Array.isArray(input)) {
    throw new TypeError(
      `@asd14/m/mapMatrix: expected 'input' to be 'Array', got '${type(input)}'`
    )
  }

  for (let index = 0, length = input.length; index < length; index++) {
    if (!Array.isArray(input[index])) {
      throw new TypeError(
        `@asd14/m/mapMatrix: expected 'row' to be 'Array', got '${type(input[index])}'`
      )
    }
  }

  const matrix = input as unknown[][]

  const result: unknown[][] = []

  for (
    let rowIndex = 0, rowCount = matrix.length;
    rowIndex < rowCount;
    rowIndex++
  ) {
    const inputRow = matrix[rowIndex] as unknown[]
    const row: unknown[] = []

    for (
      let columnIndex = 0, columnCount = inputRow.length;
      columnIndex < columnCount;
      columnIndex++
    ) {
      row.push(fn(inputRow[columnIndex], rowIndex, columnIndex, matrix))
    }

    result.push(row)
  }

  return result
}

/**
 * Matrix version of {@link map}. Iterate over a two-dimensional array and
 * apply a transform function to each element, returning a new matrix with
 * the results.
 *
 * Input is never mutated - always returns a new matrix.
 *
 * The function receives `(cell, rowIndex, columnIndex, matrix)`. A pipe chain
 * passes only the cell along.
 *
 * @param {Function|Array} fn - Transform function or pipe chain
 * @param {Array} input - Two-dimensional array to map over
 *
 * @returns {Array} New two-dimensional array of transformed elements
 *
 * @example
 * mapMatrix(x => x + 1, [[1, 2], [3, 4]])
 * // => [[2, 3], [4, 5]]
 *
 * mapMatrix((cell, rowIndex, columnIndex) => `${rowIndex},${columnIndex}:${cell}`, [[7, 8], [9, 0]])
 * // => [["0,0:7", "0,1:8"], ["1,0:9", "1,1:0"]]
 *
 * pipe(
 *   mapMatrix(x => x * 10)
 * )([[1, 2], [3, 4]])
 * // => [[10, 20], [30, 40]]
 *
 * @name mapMatrix
 * @tag Array
 *
 * @see {@link map}
 */
const mapMatrix = ((...params: unknown[]) => {
  const fn = _toFunction(params[0], { fnName: "mapMatrix", paramName: "fn" })

  // @signature (fn) => (input)
  if (params.length === 1) {
    return (input: unknown) => _mapMatrix(fn, input)
  }

  // @signature (fn, input)
  return _mapMatrix(fn, params[1])
}) as MapMatrixFn

export { mapMatrix }
export type { MapMatrixFn, MatrixMorphism }
