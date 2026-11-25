import type { AnyMorphism, UnaryPredicate } from "../../../types/function.js"
import type {
  PipePredicates1,
  PipePredicates2,
  PipePredicates3,
  PipePredicates4,
  PipePredicates5,
} from "../../pipe/pipe.js"

import { type } from "../../type/type.js"
import { _toFunction } from "../../utils/to-function.js"

type FindIndexFn = {
  // Predicate pipe overloads (most specific first, least common)
  <T1, T2, T3, T4, T5>(
    fns: PipePredicates5<T1, T2, T3, T4, T5>,
    input: readonly T1[]
  ): number
  <T1, T2, T3, T4, T5>(
    fns: PipePredicates5<T1, T2, T3, T4, T5>
  ): (input: readonly T1[]) => number

  <T1, T2, T3, T4>(
    fns: PipePredicates4<T1, T2, T3, T4>,
    input: readonly T1[]
  ): number
  <T1, T2, T3, T4>(
    fns: PipePredicates4<T1, T2, T3, T4>
  ): (input: readonly T1[]) => number

  <T1, T2, T3>(fns: PipePredicates3<T1, T2, T3>, input: readonly T1[]): number
  <T1, T2, T3>(
    fns: PipePredicates3<T1, T2, T3>
  ): (input: readonly T1[]) => number

  <T1, T2>(fns: PipePredicates2<T1, T2>, input: readonly T1[]): number
  <T1, T2>(fns: PipePredicates2<T1, T2>): (input: readonly T1[]) => number

  <T>(fns: PipePredicates1<T>, input: readonly T[]): number
  <T>(fns: PipePredicates1<T>): (input: readonly T[]) => number

  // Single predicate (most common, last so error messages reference this)
  <T>(fn: UnaryPredicate<T>, input: readonly T[]): number
  <T>(fn: UnaryPredicate<T>): (input: readonly T[]) => number
}

const _findIndex = (fn: AnyMorphism, input: unknown): number => {
  if (!Array.isArray(input)) {
    throw new TypeError(
      `@asd14/m/findIndex: expected 'input' to be 'Array', got '${type(input)}'`
    )
  }

  const finalInput = input as unknown[]

  for (let i = 0, length = finalInput.length; i < length; i++) {
    if (fn(finalInput[i]!) === true) {
      return i
    }
  }

  return -1
}

/**
 * Find the index of the first element in an array that satisfies a
 * predicate function or a chain of predicates. Returns -1 if no element
 * matches.
 *
 * A predicate passes only when it returns `true`.
 *
 * @param {Function|Array} fn - Predicate function or pipe chain
 * @param {Array} input - Array to search
 *
 * @returns {number} Index of first matching element, or -1
 *
 * @example
 * findIndex(item => item.id === 2, [{ id: 1 }, { id: 2 }])
 * // => 1
 *
 * findIndex(isSomething)([null, undefined, "found"])
 * // => 2
 *
 * findIndex([read("id"), isSomething], [{ name: "a" }, { id: 2, name: "b" }])
 * // => 1
 *
 * findIndex(item => item.id === 99, [{ id: 1 }, { id: 2 }])
 * // => -1
 *
 * pipe(
 *   filter(item => item.id > 1),
 *   findIndex(item => item.id === 3)
 * )([{ id: 1 }, { id: 2 }, { id: 3 }])
 * // => 1
 *
 * @name findIndex
 * @tag Array
 *
 * @see {@link find}
 * @see {@link findIndexWith}
 * @see {@link filter}
 */
const findIndex = ((...params: unknown[]) => {
  const fn = _toFunction(params[0], { fnName: "findIndex", paramName: "fn" })

  // @signature (fn) => (input)
  if (params.length === 1) {
    return (input: unknown) => _findIndex(fn, input)
  }

  // @signature (fn, input)
  return _findIndex(fn, params[1])
}) as FindIndexFn

export { findIndex }
export type { FindIndexFn }
