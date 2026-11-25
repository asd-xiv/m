import type { AnyMorphism, UnaryPredicate } from "../../types/function.js"
import type {
  PipePredicates1,
  PipePredicates2,
  PipePredicates3,
  PipePredicates4,
  PipePredicates5,
} from "../pipe/pipe.js"

import { type } from "../type/type.js"
import { _toFunction } from "../utils/to-function.js"

type FilterFn = {
  // Predicate pipe overloads (most specific first, least common)
  <T1, T2, T3, T4, T5>(
    fns: PipePredicates5<T1, T2, T3, T4, T5>,
    input: readonly T1[]
  ): T1[]
  <T1, T2, T3, T4, T5>(
    fns: PipePredicates5<T1, T2, T3, T4, T5>
  ): (input: readonly T1[]) => T1[]

  <T1, T2, T3, T4>(
    fns: PipePredicates4<T1, T2, T3, T4>,
    input: readonly T1[]
  ): T1[]
  <T1, T2, T3, T4>(
    fns: PipePredicates4<T1, T2, T3, T4>
  ): (input: readonly T1[]) => T1[]

  <T1, T2, T3>(fns: PipePredicates3<T1, T2, T3>, input: readonly T1[]): T1[]
  <T1, T2, T3>(fns: PipePredicates3<T1, T2, T3>): (input: readonly T1[]) => T1[]

  <T1, T2>(fns: PipePredicates2<T1, T2>, input: readonly T1[]): T1[]
  <T1, T2>(fns: PipePredicates2<T1, T2>): (input: readonly T1[]) => T1[]

  <T>(fns: PipePredicates1<T>, input: readonly T[]): T[]
  <T>(fns: PipePredicates1<T>): (input: readonly T[]) => T[]

  // Single predicate (most common, last so error messages reference this)
  <T>(fn: UnaryPredicate<T>, input: readonly T[]): T[]
  <T>(fn: UnaryPredicate<T>): (input: readonly T[]) => T[]
}

const _filter = (fn: AnyMorphism, input: unknown[]): unknown[] => {
  if (!Array.isArray(input)) {
    throw new TypeError(
      `@asd14/m/filter: expected 'input' to be 'Array', got '${type(input)}'`
    )
  }
  const result: unknown[] = []

  for (let i = 0, length = input.length; i < length; i++) {
    if (fn(input[i]) === true) {
      result.push(input[i])
    }
  }

  return result
}

/**
 * Filter elements of an array that satisfy a predicate function or a chain
 * of predicates.
 *
 * A predicate passes only when it returns `true`.
 *
 * Input is never mutated - always returns a new array.
 *
 * @param {Function|Array} fn - Predicate function or pipe chain
 * @param {readonly Array} input - Array to filter
 *
 * @returns {Array} New array of elements that satisfy the predicate
 *
 * @example
 * filter(x => x > 3, [1, 2, 3, 4, 5])
 * // => [4, 5]
 *
 * filter(isSomething)([1, null, 3, undefined])
 * // => [1, 3]
 *
 * filter([read("id"), isEqual(1)], [{ id: 1 }, { id: 2 }, { id: 1 }])
 * // => [{ id: 1 }, { id: 1 }]
 *
 * pipe(
 *   filter(x => x > 0),
 *   map(x => x * 2)
 * )([-1, 2, -3, 4])
 * // => [4, 8]
 *
 * @name filter
 * @tag Array
 *
 * @see {@link filterWith}
 * @see {@link find}
 * @see {@link findWith}
 * @see {@link partition}
 */
const filter = ((...params: unknown[]) => {
  const fn = _toFunction(params[0], { fnName: "filter", paramName: "fn" })

  // @signature (fn) => (input)
  if (params.length === 1) {
    return (input: unknown[]) => _filter(fn, input)
  }

  // @signature (fn, input)
  return _filter(fn, params[1] as unknown[])
}) as FilterFn

export { filter }
export type { FilterFn }
