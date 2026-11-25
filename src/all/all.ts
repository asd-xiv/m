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

type AllFn = {
  // Predicate pipe overloads (most specific first, least common)
  <T1, T2, T3, T4, T5>(
    fns: PipePredicates5<T1, T2, T3, T4, T5>,
    input: readonly T1[]
  ): boolean
  <T1, T2, T3, T4, T5>(
    fns: PipePredicates5<T1, T2, T3, T4, T5>
  ): (input: readonly T1[]) => boolean

  <T1, T2, T3, T4>(
    fns: PipePredicates4<T1, T2, T3, T4>,
    input: readonly T1[]
  ): boolean
  <T1, T2, T3, T4>(
    fns: PipePredicates4<T1, T2, T3, T4>
  ): (input: readonly T1[]) => boolean

  <T1, T2, T3>(fns: PipePredicates3<T1, T2, T3>, input: readonly T1[]): boolean
  <T1, T2, T3>(
    fns: PipePredicates3<T1, T2, T3>
  ): (input: readonly T1[]) => boolean

  <T1, T2>(fns: PipePredicates2<T1, T2>, input: readonly T1[]): boolean
  <T1, T2>(fns: PipePredicates2<T1, T2>): (input: readonly T1[]) => boolean

  <T>(fns: PipePredicates1<T>, input: readonly T[]): boolean
  <T>(fns: PipePredicates1<T>): (input: readonly T[]) => boolean

  // Single predicate (most common, last so error messages reference this)
  <T>(fn: UnaryPredicate<T>, input: readonly T[]): boolean
  <T>(fn: UnaryPredicate<T>): (input: readonly T[]) => boolean
}

const _all = (fn: AnyMorphism, input: unknown[]): boolean => {
  if (!Array.isArray(input)) {
    throw new TypeError(
      `@asd14/m/all: expected 'input' to be 'Array', got '${type(input)}'`
    )
  }

  for (let i = 0, length = input.length; i < length; i++) {
    if (fn(input[i]) !== true) {
      return false
    }
  }

  return true
}

/**
 * Test if all elements of an array satisfy a predicate function or a chain
 * of predicates.
 *
 * A predicate passes only when it returns `true`. An empty array passes.
 *
 * @param {Function|Array} fn - Predicate function or pipe chain
 * @param {Array} input - Array to test
 *
 * @returns {boolean} True if all elements satisfy the predicate
 *
 * @example
 * all(isNumber, [1, 2, 3])
 * // => true
 *
 * all(isSomething)([1, "asd", null])
 * // => false
 *
 * all([read("id"), isNumber], [{ id: 0 }, { id: 1 }, { id: 2 }])
 * // => true
 *
 * pipe(
 *   filter(x => x > 0),
 *   all(x => x < 10)
 * )([-1, 2, -3, 4])
 * // => true
 *
 * @name all
 * @tag Array
 *
 * @see {@link allWith}
 * @see {@link any}
 * @see {@link anyWith}
 */
const all = ((...params: unknown[]) => {
  const fn = _toFunction(params[0], { fnName: "all", paramName: "fn" })

  // @signature (fn) => (input)
  if (params.length === 1) {
    return (input: unknown[]) => _all(fn, input)
  }

  // @signature (fn, input)
  return _all(fn, params[1] as unknown[])
}) as AllFn

export { all }
export type { AllFn }
