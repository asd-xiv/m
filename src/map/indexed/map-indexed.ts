import type { AnyMorphism } from "../../../types/function.js"
import type {
  PipeMorphisms1,
  PipeMorphisms2,
  PipeMorphisms3,
  PipeMorphisms4,
} from "../../pipe/pipe.js"

import { type } from "../../type/type.js"
import { _toFunction } from "../../utils/to-function.js"

type MapIndexedMorphism<I, O> = (
  item: I,
  index: number,
  array: readonly I[]
) => O

type MapIndexedFn = {
  // Morphism pipe overloads, the first function gets only the item
  <T1, T2, T3, T4, T5>(
    fns: PipeMorphisms4<T1, T2, T3, T4, T5>,
    input: readonly T1[]
  ): T5[]
  <T1, T2, T3, T4, T5>(
    fns: PipeMorphisms4<T1, T2, T3, T4, T5>
  ): (input: readonly T1[]) => T5[]

  <T1, T2, T3, T4>(
    fns: PipeMorphisms3<T1, T2, T3, T4>,
    input: readonly T1[]
  ): T4[]
  <T1, T2, T3, T4>(
    fns: PipeMorphisms3<T1, T2, T3, T4>
  ): (input: readonly T1[]) => T4[]

  <T1, T2, T3>(fns: PipeMorphisms2<T1, T2, T3>, input: readonly T1[]): T3[]
  <T1, T2, T3>(fns: PipeMorphisms2<T1, T2, T3>): (input: readonly T1[]) => T3[]

  <T1, T2>(fns: PipeMorphisms1<T1, T2>, input: readonly T1[]): T2[]
  <T1, T2>(fns: PipeMorphisms1<T1, T2>): (input: readonly T1[]) => T2[]

  // Single morphism (most common, last so error messages reference this)
  <I, O>(fn: MapIndexedMorphism<I, O>, input: readonly I[]): O[]
  <I, O>(fn: MapIndexedMorphism<I, O>): (input: readonly I[]) => O[]
}

const _mapIndexed = (fn: AnyMorphism, input: readonly unknown[]): unknown[] => {
  if (!Array.isArray(input)) {
    throw new TypeError(
      `@asd14/m/mapIndexed: expected 'input' to be 'Array', got '${type(input)}'`
    )
  }

  const result = []

  for (let i = 0, length = input.length; i < length; i++) {
    result.push(fn(input[i], i, input))
  }

  return result
}

/**
 * Iterate over an array and apply a transform function to each element,
 * returning a new array with the results.
 *
 * Input is never mutated - always returns a new array.
 *
 * The function receives the item, its index and the array: `fn(item, index,
 * array)`, in the native order. A pipe array passes only the item to its first
 * function. Use `map` when you only need the item.
 *
 * @param {Function|Array} fn - Transform function or pipe chain
 * @param {Array} input - Array to map over
 *
 * @returns {Array} New array of transformed elements
 *
 * @example
 * mapIndexed((x, i) => x * i, [5, 6, 7])
 * // => [0, 6, 14]
 *
 * mapIndexed((x, i, all) => `${i + 1}/${all.length}: ${x}`)(["a", "b"])
 * // => ["1/2: a", "2/2: b"]
 *
 * mapIndexed([item => item.name, name => name.toUpperCase()], users)
 * // => ["ALICE", "BOB"]
 *
 * pipe(
 *   mapIndexed((x, i) => x + i),
 *   filter(x => x > 1)
 * )([1, 1, 1])
 * // => [2, 3]
 *
 * @name mapIndexed
 * @tag Array
 *
 * @see {@link map}
 * @see {@link mapMatrix}
 */
const mapIndexed = ((...params: unknown[]) => {
  const fn = _toFunction(params[0], { fnName: "mapIndexed", paramName: "fn" })

  // @signature (fn) => (input)
  if (params.length === 1) {
    return (input: readonly unknown[]) => _mapIndexed(fn, input)
  }

  // @signature (fn, input)
  return _mapIndexed(fn, params[1] as readonly unknown[])
}) as MapIndexedFn

export { mapIndexed }
export type { MapIndexedFn, MapIndexedMorphism }
