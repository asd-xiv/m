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

type FindFn = {
  // Predicate pipe overloads (most specific first, least common)
  <T1, T2, T3, T4, T5>(
    fns: PipePredicates5<T1, T2, T3, T4, T5>,
    input: readonly T1[]
  ): T1 | undefined
  <T1, T2, T3, T4, T5>(
    fns: PipePredicates5<T1, T2, T3, T4, T5>
  ): (input: readonly T1[]) => T1 | undefined

  <T1, T2, T3, T4>(
    fns: PipePredicates4<T1, T2, T3, T4>,
    input: readonly T1[]
  ): T1 | undefined
  <T1, T2, T3, T4>(
    fns: PipePredicates4<T1, T2, T3, T4>
  ): (input: readonly T1[]) => T1 | undefined

  <T1, T2, T3>(
    fns: PipePredicates3<T1, T2, T3>,
    input: readonly T1[]
  ): T1 | undefined
  <T1, T2, T3>(
    fns: PipePredicates3<T1, T2, T3>
  ): (input: readonly T1[]) => T1 | undefined

  <T1, T2>(fns: PipePredicates2<T1, T2>, input: readonly T1[]): T1 | undefined
  <T1, T2>(
    fns: PipePredicates2<T1, T2>
  ): (input: readonly T1[]) => T1 | undefined

  <T>(fns: PipePredicates1<T>, input: readonly T[]): T | undefined
  <T>(fns: PipePredicates1<T>): (input: readonly T[]) => T | undefined

  // Single predicate (most common, last so error messages reference this)
  <T>(fn: UnaryPredicate<T>, input: readonly T[]): T | undefined
  <T>(fn: UnaryPredicate<T>): (input: readonly T[]) => T | undefined
}

const _find = (fn: AnyMorphism, input: unknown): unknown => {
  if (!Array.isArray(input)) {
    throw new TypeError(
      `@asd14/m/find: expected 'input' to be 'Array', got '${type(input)}'`
    )
  }

  const finalInput = input as unknown[]

  for (let i = 0, length = finalInput.length; i < length; i++) {
    if (fn(finalInput[i]!) === true) {
      return finalInput[i]
    }
  }

  return undefined
}

/**
 * Find the first element in an array that satisfies a predicate function
 * or a chain of predicates.
 *
 * A predicate passes only when it returns `true`.
 *
 * @param {Function|Array} fn - Predicate function or pipe chain
 * @param {Array} input - Array to search
 *
 * @returns {unknown|undefined} First matching element or undefined
 *
 * @example
 * find(item => item.id === 2, [{ id: 1 }, { id: 2 }])
 * // => { id: 2 }
 *
 * find(isSomething)([null, undefined, "found"])
 * // => "found"
 *
 * find([read("id"), isSomething], [{ name: "a" }, { id: 2, name: "b" }])
 * // => { id: 2, name: "b" }
 *
 * find(item => item.id === 99, [{ id: 1 }, { id: 2 }])
 * // => undefined
 *
 * pipe(
 *   filter(item => item.id > 1),
 *   find(item => item.id === 2)
 * )([{ id: 1 }, { id: 2 }, { id: 3 }])
 * // => { id: 2 }
 *
 * @name find
 * @tag Array
 *
 * @see {@link findWith}
 * @see {@link findIndex}
 * @see {@link findIndexWith}
 * @see {@link filter}
 */
const find = ((...params: unknown[]) => {
  const fn = _toFunction(params[0], { fnName: "find", paramName: "fn" })

  // @signature (fn) => (input)
  if (params.length === 1) {
    return (input: unknown) => _find(fn, input)
  }

  // @signature (fn, input)
  return _find(fn, params[1])
}) as FindFn

export { find }
export type { FindFn }
