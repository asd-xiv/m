import type { AnyMorphism, UnaryMorphism } from "../../../types/function.js"

import { type } from "../../type/type.js"

type MaybePromise<T> = T | Promise<T>

type PipePFn = {
  // All-unary: every function takes one input, may return sync or async.
  <T1, O>(
    fn1: UnaryMorphism<T1, MaybePromise<O>>
  ): UnaryMorphism<T1, Promise<O>>

  <T1, T2, O>(
    fn1: UnaryMorphism<T1, MaybePromise<T2>>,
    fn2: UnaryMorphism<T2, MaybePromise<O>>
  ): UnaryMorphism<T1, Promise<O>>

  <T1, T2, T3, O>(
    fn1: UnaryMorphism<T1, MaybePromise<T2>>,
    fn2: UnaryMorphism<T2, MaybePromise<T3>>,
    fn3: UnaryMorphism<T3, MaybePromise<O>>
  ): UnaryMorphism<T1, Promise<O>>

  <T1, T2, T3, T4, O>(
    fn1: UnaryMorphism<T1, MaybePromise<T2>>,
    fn2: UnaryMorphism<T2, MaybePromise<T3>>,
    fn3: UnaryMorphism<T3, MaybePromise<T4>>,
    fn4: UnaryMorphism<T4, MaybePromise<O>>
  ): UnaryMorphism<T1, Promise<O>>

  <T1, T2, T3, T4, T5, O>(
    fn1: UnaryMorphism<T1, MaybePromise<T2>>,
    fn2: UnaryMorphism<T2, MaybePromise<T3>>,
    fn3: UnaryMorphism<T3, MaybePromise<T4>>,
    fn4: UnaryMorphism<T4, MaybePromise<T5>>,
    fn5: UnaryMorphism<T5, MaybePromise<O>>
  ): UnaryMorphism<T1, Promise<O>>
}

/**
 * Performs left-to-right unary function composition where each function may
 * return a value or a Promise. Each step waits for the previous to resolve
 * before calling the next.
 *
 * @param {Function} fns - One or more unary functions (sync or async) to compose
 *
 * @returns {Function} A composed function returning a Promise
 *
 * @example
 * const incP = (input: number) => Promise.resolve(input + 1)
 * const inc = (input: number) => input + 1
 *
 * await pipeP(incP, inc)(2)
 * // => 4
 *
 * @name pipeP
 * @tag Function
 *
 * @see {@link pipe}
 */
const pipeP = ((...fns: unknown[]) => {
  if (fns.length === 0) {
    throw new TypeError(
      "@asd14/m/pipeP: expected 'fns' to be 'NonEmpty', got 'Empty'"
    )
  }

  for (let index = 0, length = fns.length; index < length; index++) {
    if (typeof fns[index] !== "function") {
      throw new TypeError(
        `@asd14/m/pipeP: expected 'fns[${index}]' to be 'Function', got '${type(fns[index])}'`
      )
    }
  }

  // Each item is a function, checked above
  const finalFns = fns as AnyMorphism[]

  return (input: unknown) => {
    // The executor turns a throw of the first function into a rejection
    let acc = new Promise<unknown>(resolve => {
      resolve(finalFns[0]!(input))
    })

    for (let index = 1, length = fns.length; index < length; index++) {
      acc = acc.then((result): unknown => finalFns[index]!(result))
    }

    return acc
  }
}) as PipePFn

export { pipeP }
export type { PipePFn }
