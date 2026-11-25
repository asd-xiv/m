import type { AnyMorphism, UnaryMorphism } from "../../types/function.js"
import type {
  PipeMorphisms1,
  PipeMorphisms2,
  PipeMorphisms3,
  PipeMorphisms4,
} from "../pipe/pipe.js"

import { type } from "../type/type.js"
import { _toFunction } from "../utils/to-function.js"

type MapMorphism<I, O> = UnaryMorphism<I, O>

type MapFn = {
  // Morphism pipe overloads (most specific first, least common)
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
  <I, O>(fn: MapMorphism<I, O>, input: readonly I[]): O[]
  <I, O>(fn: MapMorphism<I, O>): (input: readonly I[]) => O[]
}

const _map = (fn: AnyMorphism, input: readonly unknown[]): unknown[] => {
  if (!Array.isArray(input)) {
    throw new TypeError(
      `@asd14/m/map: expected 'input' to be 'Array', got '${type(input)}'`
    )
  }

  const result = []

  for (let i = 0, length = input.length; i < length; i++) {
    result.push(fn(input[i]))
  }

  return result
}

/**
 * Iterate over an array and apply a transform function to each element,
 * returning a new array with the results.
 *
 * Input is never mutated - always returns a new array.
 *
 * The function receives only the item: `fn(item)`. Use `mapIndexed` when you
 * need the index.
 *
 * @param {Function|Array} fn - Transform function or pipe chain
 * @param {Array} input - Array to map over
 *
 * @returns {Array} New array of transformed elements
 *
 * @example
 * map(x => x + 1, [1, 2])
 * // => [2, 3]
 *
 * map([item => item.name, name => name.toUpperCase()], users)
 * // => ["ALICE", "BOB", "CAROL"]
 *
 * pipe(
 *   map(x => x * 2),
 *   filter(x => x > 4)
 * )([1, 2, 3, 4])
 * // => [6, 8]
 *
 * @name map
 * @tag Array
 *
 * @see {@link mapIndexed}
 * @see {@link mapMatrix}
 */
const map = ((...params: unknown[]) => {
  const fn = _toFunction(params[0], { fnName: "map", paramName: "fn" })

  // @signature (fn) => (input)
  if (params.length === 1) {
    return (input: readonly unknown[]) => _map(fn, input)
  }

  // @signature (fn, input)
  return _map(fn, params[1] as readonly unknown[])
}) as MapFn

export { map }
export type { MapFn, MapMorphism }
