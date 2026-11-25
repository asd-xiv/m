import type { Morphism } from "../../types/function.js"

import { type } from "../type/type.js"

type ReduceMorphism<T, TAcc> = Morphism<[acc: TAcc, item: T], TAcc>

type ReduceFn = {
  // Uncurried: (fn, defaultAcc, input) => TAcc
  <T, TAcc>(
    fn: ReduceMorphism<T, TAcc>,
    defaultAcc: TAcc,
    input: readonly T[]
  ): TAcc

  // Curried: (fn, defaultAcc) => (input) => TAcc
  <T, TAcc>(
    fn: ReduceMorphism<T, TAcc>,
    defaultAcc: TAcc
  ): (input: readonly T[]) => TAcc
}

const _reduce = (
  fn: Morphism<[unknown, unknown], unknown>,
  defaultAcc: unknown,
  input: unknown
): unknown => {
  if (!Array.isArray(input)) {
    throw new TypeError(
      `@asd14/m/reduce: expected 'input' to be 'Array', got '${type(input)}'`
    )
  }

  let acc = defaultAcc

  for (let i = 0, length = input.length; i < length; i++) {
    acc = fn(acc, input[i])
  }

  return acc
}

/**
 * Apply a function against an accumulator and each element in the array (from
 * left to right) to reduce it to a single value.
 *
 * @param {Function} fn - Reducer `(acc, item) => acc`, it receives no index
 * @param {unknown} defaultAcc - Initial accumulator value
 * @param {Array} input - Array to reduce
 *
 * @returns {unknown} The final accumulated value
 *
 * @example
 * const sum = (acc, item) => acc + item
 *
 * reduce(sum, 0, [1, 2])
 * // => 3
 *
 * reduce(sum, 0)([1, 2])
 * // => 3
 *
 * pipe(
 *   filter(item => item > 1),
 *   reduce(sum, 0)
 * )([1, 2, 3])
 * // => 5
 *
 * @name reduce
 * @tag Array
 *
 * @see {@link map}
 * @see {@link sum}
 */
const reduce = ((...params: unknown[]) => {
  const fn = params[0]

  if (typeof fn !== "function") {
    throw new TypeError(
      `@asd14/m/reduce: expected 'fn' to be 'Function', got '${type(fn)}'`
    )
  }

  if (params.length === 1) {
    throw new TypeError(
      "@asd14/m/reduce: expected 'defaultAcc' to be 'Any', got 'Missing'"
    )
  }

  const reducer = fn as Morphism<[unknown, unknown], unknown>

  // @signature (fn, defaultAcc) => (input)
  if (params.length === 2) {
    return (input: unknown) => _reduce(reducer, params[1], input)
  }

  // @signature (fn, defaultAcc, input)
  return _reduce(reducer, params[1], params[2])
}) as ReduceFn

export { reduce }
export type { ReduceFn, ReduceMorphism }
