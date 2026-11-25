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

type PartitionFn = {
  // Predicate pipe overloads (most specific first, least common)
  <T1, T2, T3, T4, T5>(
    fns: PipePredicates5<T1, T2, T3, T4, T5>,
    input: readonly T1[]
  ): [T1[], T1[]]
  <T1, T2, T3, T4, T5>(
    fns: PipePredicates5<T1, T2, T3, T4, T5>
  ): (input: readonly T1[]) => [T1[], T1[]]

  <T1, T2, T3, T4>(
    fns: PipePredicates4<T1, T2, T3, T4>,
    input: readonly T1[]
  ): [T1[], T1[]]
  <T1, T2, T3, T4>(
    fns: PipePredicates4<T1, T2, T3, T4>
  ): (input: readonly T1[]) => [T1[], T1[]]

  <T1, T2, T3>(
    fns: PipePredicates3<T1, T2, T3>,
    input: readonly T1[]
  ): [T1[], T1[]]
  <T1, T2, T3>(
    fns: PipePredicates3<T1, T2, T3>
  ): (input: readonly T1[]) => [T1[], T1[]]

  <T1, T2>(fns: PipePredicates2<T1, T2>, input: readonly T1[]): [T1[], T1[]]
  <T1, T2>(fns: PipePredicates2<T1, T2>): (input: readonly T1[]) => [T1[], T1[]]

  <T>(fns: PipePredicates1<T>, input: readonly T[]): [T[], T[]]
  <T>(fns: PipePredicates1<T>): (input: readonly T[]) => [T[], T[]]

  // Single predicate (most common, last so error messages reference this)
  <T>(fn: UnaryPredicate<T>, input: readonly T[]): [T[], T[]]
  <T>(fn: UnaryPredicate<T>): (input: readonly T[]) => [T[], T[]]
}

const _partition = (
  fn: AnyMorphism,
  input: unknown[]
): [unknown[], unknown[]] => {
  if (!Array.isArray(input)) {
    throw new TypeError(
      `@asd14/m/partition: expected 'input' to be 'Array', got '${type(input)}'`
    )
  }
  const pass: unknown[] = []
  const fail: unknown[] = []

  for (let i = 0, length = input.length; i < length; i++) {
    if (fn(input[i]) === true) {
      pass.push(input[i])
    } else {
      fail.push(input[i])
    }
  }

  return [pass, fail]
}

/**
 * Split an array into two groups based on a predicate function or a chain
 * of predicates. Returns a tuple where the first element contains items
 * that satisfy the predicate and the second contains the rest.
 *
 * A predicate passes only when it returns `true`.
 *
 * Input is never mutated - always returns a new tuple of new arrays.
 *
 * @param {Function|Array} fn - Predicate function or pipe chain
 * @param {Array} input - Array to partition
 *
 * @returns {[Array, Array]} Tuple of [pass, fail] arrays
 *
 * @example
 * partition(x => x % 2 === 0, [1, 2, 3, 4, 5])
 * // => [[2, 4], [1, 3, 5]]
 *
 * partition(x => x > 3)([1, 2, 3, 4, 5])
 * // => [[4, 5], [1, 2, 3]]
 *
 * partition(
 *   [read("comments"), isSomething],
 *   [{ id: 1, comments: [] }, { id: 2 }]
 * )
 * // => [[{ id: 1, comments: [] }], [{ id: 2 }]]
 *
 * pipe(
 *   partition(x => x > 0),
 *   ([positives, rest]) => ({ positives, rest })
 * )([-1, 2, -3, 4])
 * // => { positives: [2, 4], rest: [-1, -3] }
 *
 * @name partition
 * @tag Array
 *
 * @see {@link partitionWith}
 * @see {@link filter}
 * @see {@link filterWith}
 */
const partition = ((...params: unknown[]) => {
  const fn = _toFunction(params[0], { fnName: "partition", paramName: "fn" })

  // @signature (fn) => (input)
  if (params.length === 1) {
    return (input: unknown[]) => _partition(fn, input)
  }

  // @signature (fn, input)
  return _partition(fn, params[1] as unknown[])
}) as PartitionFn

export { partition }
export type { PartitionFn }
