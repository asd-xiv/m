import type { AnyMorphism, UnaryMorphism } from "../../types/function.js"
import type {
  PipeMorphisms1,
  PipeMorphisms2,
  PipeMorphisms3,
  PipeMorphisms4,
} from "../pipe/pipe.js"

import { type } from "../type/type.js"
import { _toFunction } from "../utils/to-function.js"

type ForEachCallback<T> = UnaryMorphism<T, void>

type ForEachFn = {
  // Morphism pipe overloads (most specific first, least common)
  <T1, T2, T3, T4, T5>(
    fns: PipeMorphisms4<T1, T2, T3, T4, T5>,
    input: readonly T1[]
  ): void
  <T1, T2, T3, T4, T5>(
    fns: PipeMorphisms4<T1, T2, T3, T4, T5>
  ): (input: readonly T1[]) => void

  <T1, T2, T3, T4>(
    fns: PipeMorphisms3<T1, T2, T3, T4>,
    input: readonly T1[]
  ): void
  <T1, T2, T3, T4>(
    fns: PipeMorphisms3<T1, T2, T3, T4>
  ): (input: readonly T1[]) => void

  <T1, T2, T3>(fns: PipeMorphisms2<T1, T2, T3>, input: readonly T1[]): void
  <T1, T2, T3>(fns: PipeMorphisms2<T1, T2, T3>): (input: readonly T1[]) => void

  <T1, T2>(fns: PipeMorphisms1<T1, T2>, input: readonly T1[]): void
  <T1, T2>(fns: PipeMorphisms1<T1, T2>): (input: readonly T1[]) => void

  // Single callback (most common, last so error messages reference this)
  <T>(fn: ForEachCallback<T>, input: readonly T[]): void
  <T>(fn: ForEachCallback<T>): (input: readonly T[]) => void
}

const _forEach = (fn: AnyMorphism, input: readonly unknown[]): void => {
  if (!Array.isArray(input)) {
    throw new TypeError(
      `@asd14/m/forEach: expected 'input' to be 'Array', got '${type(input)}'`
    )
  }

  for (let i = 0, length = input.length; i < length; i++) {
    fn(input[i])
  }
}

/**
 * Call a function for each element of an array. Supports both single
 * callbacks and pipe chains. The function receives only the item:
 * `fn(item)`.
 *
 * @param {Function|Array} fn - Callback or pipe chain to apply to each element
 * @param {Array} input - Array to iterate over
 *
 * @returns {void} Always `undefined`
 *
 * @example
 * forEach(item => console.log(item), [1, 2, 3])
 * // logs: 1, 2, 3
 *
 * forEach(item => console.log(item))([1, 2, 3])
 * // logs: 1, 2, 3
 *
 * forEach([inc, item => console.log(item)], [1, 2, 3])
 * // logs: 2, 3, 4
 *
 * pipe(
 *   filter(item => item > 1),
 *   forEach(item => console.log(item))
 * )([1, 2, 3])
 * // logs: 2, 3
 *
 * @name forEach
 * @tag Array
 *
 * @see {@link map}
 */
const forEach = ((...params: unknown[]) => {
  const fn = _toFunction(params[0], { fnName: "forEach", paramName: "fn" })

  // @signature (fn) => (input)
  if (params.length === 1) {
    return (input: readonly unknown[]) => {
      _forEach(fn, input)
    }
  }

  // @signature (fn, input)
  // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
  return _forEach(fn, params[1] as readonly unknown[])
}) as ForEachFn

export { forEach }
export type { ForEachFn, ForEachCallback }
