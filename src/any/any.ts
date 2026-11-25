import type { AnyMorphism, UnaryPredicate } from "../../types/function.js"
import { isEqual } from "../is-equal/is-equal.js"
import type {
  PipePredicates1,
  PipePredicates2,
  PipePredicates3,
  PipePredicates4,
  PipePredicates5,
} from "../pipe/pipe.js"
import { type } from "../type/type.js"
import { _toFunction } from "../utils/to-function.js"

type AnyFn = {
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

  // Single predicate (most common)
  <T>(fn: UnaryPredicate<T>, input: readonly T[]): boolean
  <T>(fn: UnaryPredicate<T>): (input: readonly T[]) => boolean

  // Value comparison (matches by equality instead of predicate, last so
  // error messages reference this overload for the common case)
  // A value is never an array: an array in the first slot is a pipe. Match an
  // array with a predicate
  <T>(value: Exclude<T, readonly unknown[]>, input: readonly T[]): boolean
  <T>(value: Exclude<T, readonly unknown[]>): (input: readonly T[]) => boolean
}

const _any = (predicate: AnyMorphism, input: unknown): boolean => {
  if (!Array.isArray(input)) {
    throw new TypeError(
      `@asd14/m/any: expected 'input' to be 'Array', got '${type(input)}'`
    )
  }

  for (let i = 0, length = input.length; i < length; i++) {
    if (predicate(input[i]) === true) {
      return true
    }
  }

  return false
}

/**
 * Test if any element of an array satisfies a predicate function, a chain of
 * predicates, or equals a value.
 *
 * A predicate passes only when it returns `true`. A value compares with
 * SameValueZero, as `Array.prototype.includes` does, so `NaN` equals `NaN`.
 * A value is never an array, since an array in the first slot is a pipe.
 * Match an array with a predicate.
 *
 * @param {Function|Array|*} fn - Predicate function, pipe chain or value
 * @param {Array} input - Array to test
 *
 * @returns {boolean} True if at least one element matches
 *
 * @example
 * any(x => x > 3, [1, 2, 3, 4])
 * // => true
 *
 * any(2)([1, 2, 3])
 * // => true
 *
 * any(Number.NaN, [1, Number.NaN])
 * // => true
 *
 * any([read("id"), isEqual(2)], [{ id: 1 }, { id: 2 }])
 * // => true
 *
 * pipe(
 *   filter(x => x > 0),
 *   any(4)
 * )([-1, 2, -3, 4])
 * // => true
 *
 * @name any
 * @tag Array
 * @alias has
 *
 * @see {@link anyWith}
 * @see {@link all}
 * @see {@link countBy}
 */
const any = ((...params: unknown[]) => {
  const fn = params[0]
  const predicate =
    typeof fn === "function" || Array.isArray(fn)
      ? _toFunction(fn, { fnName: "any", paramName: "fn" })
      : (item: unknown) => isEqual(fn, item)

  // @signature (fn) => (input)
  if (params.length === 1) {
    return (input: unknown) => _any(predicate, input)
  }

  // @signature (fn, input)
  return _any(predicate, params[1])
}) as AnyFn

export { any, any as has }
export type { AnyFn }
