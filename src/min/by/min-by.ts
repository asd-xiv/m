import type { AnyMorphism, UnaryMorphism } from "../../../types/function.js"
import type {
  PipeMorphisms1,
  PipeMorphisms2,
  PipeMorphisms3,
  PipeMorphisms4,
} from "../../pipe/pipe.js"

import { type } from "../../type/type.js"
import { _toFunction } from "../../utils/to-function.js"

type MinByFn = {
  // Morphism pipe overloads (most specific first, least common)
  <T1, T2, T3, T4>(
    fns: PipeMorphisms4<T1, T2, T3, T4, number>,
    input: readonly T1[]
  ): T1 | undefined
  <T1, T2, T3, T4>(
    fns: PipeMorphisms4<T1, T2, T3, T4, number>
  ): (input: readonly T1[]) => T1 | undefined

  <T1, T2, T3>(
    fns: PipeMorphisms3<T1, T2, T3, number>,
    input: readonly T1[]
  ): T1 | undefined
  <T1, T2, T3>(
    fns: PipeMorphisms3<T1, T2, T3, number>
  ): (input: readonly T1[]) => T1 | undefined

  <T1, T2>(
    fns: PipeMorphisms2<T1, T2, number>,
    input: readonly T1[]
  ): T1 | undefined
  <T1, T2>(
    fns: PipeMorphisms2<T1, T2, number>
  ): (input: readonly T1[]) => T1 | undefined

  <T1>(fns: PipeMorphisms1<T1, number>, input: readonly T1[]): T1 | undefined
  <T1>(
    fns: PipeMorphisms1<T1, number>
  ): (input: readonly T1[]) => T1 | undefined

  // Single function (most common, last so error messages reference this)
  <T>(fn: UnaryMorphism<T, number>, input: readonly T[]): T | undefined
  <T>(fn: UnaryMorphism<T, number>): (input: readonly T[]) => T | undefined
}

const _minBy = (fn: AnyMorphism, input: unknown): unknown => {
  if (!Array.isArray(input)) {
    throw new TypeError(
      `@asd14/m/minBy: expected 'input' to be 'Array', got '${type(input)}'`
    )
  }

  let result: unknown
  let best: number | undefined

  for (let i = 0, length = input.length; i < length; i++) {
    const item: unknown = input[i]
    const score: unknown = fn(item)

    if (typeof score !== "number") {
      throw new TypeError(
        `@asd14/m/minBy: expected 'fn(input[${i}])' to be 'Number', got '${type(score)}'`
      )
    }

    // NaN cannot be ordered, so it never wins. The first item wins a tie
    if (!Number.isNaN(score) && (best === undefined || score < best)) {
      best = score
      result = item
    }
  }

  return result
}

/**
 * Find the item whose `fn` result is the smallest. The first item wins a tie.
 * Skips an item whose result is `NaN`, and returns `undefined` when no item is
 * left. Throws on a result that is not a number.
 *
 * Input is never mutated.
 *
 * @param {Function|Array} fn - Function or pipe chain that returns a number
 * @param {readonly Array} input - Array to search
 *
 * @returns {*|undefined} The item with the smallest result, or `undefined`
 *
 * @example
 * minBy(user => user.age, [{ age: 30 }, { age: 25 }, { age: 41 }])
 * // => { age: 25 }
 *
 * minBy(user => user.age)([])
 * // => undefined
 *
 * minBy([read("stats"), read("score")], [{ stats: { score: 1 } }, { stats: { score: 9 } }])
 * // => { stats: { score: 1 } }
 *
 * pipe(
 *   filter(user => user.isActive),
 *   minBy(user => user.age)
 * )(users)
 * // => { isActive: true, age: 25 }
 *
 * @name minBy
 * @tag Array
 *
 * @see {@link max}
 * @see {@link maxBy}
 * @see {@link sortBy}
 */
const minBy = ((...params: unknown[]) => {
  const fn = _toFunction(params[0], { fnName: "minBy", paramName: "fn" })

  // @signature (fn) => (input)
  if (params.length === 1) {
    return (input: unknown) => _minBy(fn, input)
  }

  // @signature (fn, input)
  return _minBy(fn, params[1])
}) as MinByFn

export { minBy }
export type { MinByFn }
