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

type CountByFn = {
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

const _countBy = (fn: AnyMorphism, input: unknown[]): number => {
  if (!Array.isArray(input)) {
    throw new TypeError(
      `@asd14/m/countBy: expected 'input' to be 'Array', got '${type(input)}'`
    )
  }

  let result = 0

  for (let i = 0, length = input.length; i < length; i++) {
    if (fn(input[i]) === true) {
      result = result + 1
    }
  }

  return result
}

/**
 * Count the number of elements in an array that satisfy a predicate
 * function or a chain of predicates.
 *
 * A predicate passes only when it returns `true`.
 *
 * @param {Function|Function[]} fn - Predicate function or pipe chain
 * @param {Array} input - Array to count over
 *
 * @returns {number} Number of elements satisfying the predicate
 *
 * @example
 * countBy(x => x > 2, [1, 2, 3, 4])
 * // => 2
 *
 * countBy(isSomething)([1, null, 3, undefined])
 * // => 2
 *
 * countBy(
 *   [item => item.score, score => score > 5],
 *   [{ score: 1 }, { score: 10 }, { score: 10 }]
 * )
 * // => 2
 *
 * pipe(
 *   filter(item => item.score > 0),
 *   countBy(item => item.score > 5)
 * )([{ score: -1 }, { score: 10 }, { score: 3 }])
 * // => 1
 *
 * @name countBy
 * @tag Array
 *
 * @see {@link count}
 * @see {@link countWith}
 */
const countBy = ((...params: unknown[]) => {
  const fn = _toFunction(params[0], { fnName: "countBy", paramName: "fn" })

  // @signature (fn) => (input)
  if (params.length === 1) {
    return (input: unknown) => _countBy(fn, input as unknown[])
  }

  // @signature (fn, input)
  return _countBy(fn, params[1] as unknown[])
}) as CountByFn

export { countBy }
export type { CountByFn }
