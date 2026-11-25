/* eslint-disable unicorn/prevent-abbreviations */

import { type } from "../type/type.js"

type CurryFn = {
  // 0-ary: nothing to curry, return as-is
  <R>(fn: () => R): () => R

  // 1-ary: nothing to curry, return as-is
  <A, R>(fn: (a: A) => R): (a: A) => R

  // 2-ary
  <A, B, R>(fn: (a: A, b: B) => R): (a: A) => (b: B) => R

  // 3-ary
  <A, B, C, R>(fn: (a: A, b: B, c: C) => R): (a: A) => (b: B) => (c: C) => R

  // 4-ary
  <A, B, C, D, R>(
    fn: (a: A, b: B, c: C, d: D) => R
  ): (a: A) => (b: B) => (c: C) => (d: D) => R

  // 5-ary (last so error messages reference this)
  <A, B, C, D, E, R>(
    fn: (a: A, b: B, c: C, d: D, e: E) => R
  ): (a: A) => (b: B) => (c: C) => (d: D) => (e: E) => R
}

const _curry = (fn: unknown): unknown => {
  const _fn = fn as (...params: unknown[]) => unknown

  const curried = (...params: unknown[]): unknown => {
    const _params = params.length === 0 ? [undefined] : params

    return _params.length >= _fn.length
      ? _fn(..._params)
      : (...rest: unknown[]) =>
          curried(..._params, ...(rest.length === 0 ? [undefined] : rest))
  }

  return _fn.length <= 1 ? _fn : curried
}

/**
 * Transform a multi-argument function into a chain of unary functions.
 * Each call consumes one argument and returns a new function expecting
 * the next, until all arguments are supplied and the original function
 * is invoked.
 *
 * Input is never mutated - always returns a new function.
 *
 * @param {Function} fn - The function to curry (up to 5 arguments)
 *
 * @returns {Function} A curried version of the input function
 *
 * @example
 * const sum = (a: number, b: number) => a + b
 *
 * curry(sum)(1)(2)
 * // => 3
 *
 * @example
 * const add3 = (a: number, b: number, c: number) => a + b + c
 *
 * curry(add3)(1)(2)(3)
 * // => 6
 *
 * // In a pipe - curry a binary function for partial application
 * const multiply = (a: number, b: number) => a * b
 * pipe(curry(multiply)(2), String)(5)
 * // => "10"
 *
 * @name curry
 * @tag Function
 */
const curry = ((...params: unknown[]) => {
  const fn = params[0]

  if (typeof fn !== "function") {
    throw new TypeError(
      `@asd14/m/curry: expected 'fn' to be 'Function', got '${type(fn)}'`
    )
  }

  return _curry(fn)
}) as CurryFn

export { curry }
export type { CurryFn }
