import type { Primitive } from "../../types/basic.js"
import type {
  AnyMorphism,
  UnaryMorphism,
  UnaryPredicate,
} from "../../types/function.js"

import { i } from "../i/i.js"
import { _toFunction } from "../utils/to-function.js"

type WhenFn = {
  // 4-arg: uncurried with else (primitive branches first)
  <T, TThen extends Primitive, TElse extends Primitive>(
    predicate: UnaryPredicate<T> | AnyMorphism[],
    thenFn: TThen,
    elseFn: TElse,
    input: T
  ): TThen | TElse
  <T, TThen, TElse>(
    predicate: UnaryPredicate<T> | AnyMorphism[],
    thenFn: UnaryMorphism<T, TThen> | AnyMorphism[],
    elseFn: UnaryMorphism<T, TElse> | AnyMorphism[],
    input: T
  ): TThen | TElse

  // 3-arg: curried with else (primitive branches first)
  <T, TThen extends Primitive, TElse extends Primitive>(
    predicate: UnaryPredicate<T> | AnyMorphism[],
    thenFn: TThen,
    elseFn: TElse
  ): (input: T) => TThen | TElse
  <T, TThen, TElse>(
    predicate: UnaryPredicate<T> | AnyMorphism[],
    thenFn: UnaryMorphism<T, TThen> | AnyMorphism[],
    elseFn: UnaryMorphism<T, TElse> | AnyMorphism[]
  ): (input: T) => TThen | TElse

  // 2-arg: curried without else (primitive branch first)
  <T, TThen extends Primitive>(
    predicate: UnaryPredicate<T> | AnyMorphism[],
    thenFn: TThen
  ): (input: T) => T | TThen
  <T, TThen>(
    predicate: UnaryPredicate<T> | AnyMorphism[],
    thenFn: UnaryMorphism<T, TThen> | AnyMorphism[]
  ): (input: T) => T | TThen
}

const _when = (
  predicate: AnyMorphism,
  thenFn: AnyMorphism,
  elseFn: AnyMorphism,
  input: unknown
): unknown => (predicate(input) === true ? thenFn(input) : elseFn(input))

// A function or a pipe array runs on the input, a plain value is returned
const _toBranch = (branch: unknown, parameterName: string): AnyMorphism =>
  typeof branch === "function" || Array.isArray(branch)
    ? _toFunction(branch, { fnName: "when", paramName: parameterName })
    : () => branch

/**
 * Run a function on the input when a predicate returns `true`, otherwise run
 * the else function or return the input unchanged. A branch can be a function,
 * a pipe array, or a plain value to return as is.
 *
 * The predicate passes only when it returns `=== true`. Calling `when` with
 * the predicate alone throws.
 *
 * @param {Function|Array} predicate - Predicate or pipe chain ending in one
 * @param {Function|Array|*} thenFn - Branch run when the predicate passes
 * @param {Function|Array|*} [elseFn] - Branch run otherwise, defaults to
 * identity
 * @param {*} [input] - Value to test, omit it to get a function back
 *
 * @returns {*} The branch result, or a function waiting for the input
 *
 * @example
 * when(x => x % 2 === 1, x => x + 1, x => x - 1, 5)
 * // => 6
 *
 * when(x => x % 2 === 1, "odd", "even", 6)
 * // => "even"
 *
 * when(x => x > 3, x => x * 2)(2)
 * // => 2
 *
 * when([read("age"), x => x >= 18], "adult", "minor")({ age: 20 })
 * // => "adult"
 *
 * pipe(
 *   map(when(x => x < 0, x => 0)),
 *   sum
 * )([-1, 2, -3, 4])
 * // => 6
 *
 * @name when
 * @tag Function
 *
 * @see {@link i}
 * @see {@link filter}
 */
const when = ((...params: unknown[]) => {
  const predicate = _toFunction(params[0], {
    fnName: "when",
    paramName: "predicate",
  })

  if (params.length === 1) {
    throw new TypeError(
      "@asd14/m/when: expected 'thenFn' to be 'Function' or 'Primitive', got 'Missing'"
    )
  }

  const thenFn = _toBranch(params[1], "thenFn")

  // @signature (predicate, thenFn) => (input) => thenFn(input) | input
  if (params.length === 2) {
    return (input: unknown) => _when(predicate, thenFn, i, input)
  }

  const elseFn = _toBranch(params[2], "elseFn")

  // @signature (predicate, thenFn, elseFn) => (input) => thenFn(input) | elseFn(input)
  if (params.length === 3) {
    return (input: unknown) => _when(predicate, thenFn, elseFn, input)
  }

  // @signature (predicate, thenFn, elseFn, input) => thenFn(input) | elseFn(input)
  return _when(predicate, thenFn, elseFn, params[3])
}) as WhenFn

export { when }
export type { WhenFn }
