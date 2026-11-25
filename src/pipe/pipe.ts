import type {
  AnyMorphism,
  UnaryMorphism,
  UnaryPredicate,
} from "../../types/function.js"

import { type } from "../type/type.js"
import { _pipe } from "../utils/pipe.js"

// -- Reusable pipe tuple types ------------------------------------------------

/**
 * Morphism tuples where each function's output feeds the next function's input.
 * Used by `map` and other functions that compose transformation chains.
 */
type PipeMorphisms1<T1, T2> = [UnaryMorphism<T1, T2>]
type PipeMorphisms2<T1, T2, T3> = [UnaryMorphism<T1, T2>, UnaryMorphism<T2, T3>]
type PipeMorphisms3<T1, T2, T3, T4> = [
  UnaryMorphism<T1, T2>,
  UnaryMorphism<T2, T3>,
  UnaryMorphism<T3, T4>,
]
type PipeMorphisms4<T1, T2, T3, T4, T5> = [
  UnaryMorphism<T1, T2>,
  UnaryMorphism<T2, T3>,
  UnaryMorphism<T3, T4>,
  UnaryMorphism<T4, T5>,
]

/**
 * Morphism chain ending with a predicate. The leading functions transform the
 * value and the final function tests it, returning boolean.
 * Used by `all`, `any`, `filter`, and other predicate-accepting functions.
 */
type PipePredicates1<T1> = [UnaryPredicate<T1>]
type PipePredicates2<T1, T2> = [UnaryMorphism<T1, T2>, UnaryPredicate<T2>]
type PipePredicates3<T1, T2, T3> = [
  UnaryMorphism<T1, T2>,
  UnaryMorphism<T2, T3>,
  UnaryPredicate<T3>,
]
type PipePredicates4<T1, T2, T3, T4> = [
  UnaryMorphism<T1, T2>,
  UnaryMorphism<T2, T3>,
  UnaryMorphism<T3, T4>,
  UnaryPredicate<T4>,
]
type PipePredicates5<T1, T2, T3, T4, T5> = [
  UnaryMorphism<T1, T2>,
  UnaryMorphism<T2, T3>,
  UnaryMorphism<T3, T4>,
  UnaryMorphism<T4, T5>,
  UnaryPredicate<T5>,
]

// -- pipe overloaded call signatures ------------------------------------------

type PipeFn = {
  // All-unary: every function takes one input, returns one output.
  // The composed result is a single unary function.
  <T1, O>(fn1: UnaryMorphism<T1, O>): UnaryMorphism<T1, O>

  <T1, T2, O>(
    fn1: UnaryMorphism<T1, T2>,
    fn2: UnaryMorphism<T2, O>
  ): UnaryMorphism<T1, O>

  <T1, T2, T3, O>(
    fn1: UnaryMorphism<T1, T2>,
    fn2: UnaryMorphism<T2, T3>,
    fn3: UnaryMorphism<T3, O>
  ): UnaryMorphism<T1, O>

  <T1, T2, T3, T4, O>(
    fn1: UnaryMorphism<T1, T2>,
    fn2: UnaryMorphism<T2, T3>,
    fn3: UnaryMorphism<T3, T4>,
    fn4: UnaryMorphism<T4, O>
  ): UnaryMorphism<T1, O>

  <T1, T2, T3, T4, T5, O>(
    fn1: UnaryMorphism<T1, T2>,
    fn2: UnaryMorphism<T2, T3>,
    fn3: UnaryMorphism<T3, T4>,
    fn4: UnaryMorphism<T4, T5>,
    fn5: UnaryMorphism<T5, O>
  ): UnaryMorphism<T1, O>
}

/**
 * Performs left-to-right unary function composition. Each function takes the
 * output of the previous as its single input.
 *
 * @param {Function} fns - One or more unary functions to compose
 *
 * @returns {Function} A composed unary function
 *
 * @example
 * const inc = (input: number) => input + 1
 *
 * pipe(inc)(2)
 * // => 3
 *
 * @example
 * const inc = (input: number) => input + 1
 *
 * pipe(inc, inc)(2)
 * // => 4
 *
 * @example
 * const sep = "/"
 * const dropLast = (input: string[]) => input.slice(0, -1)
 * const push = (name: string) => (input: string[]) => [...input, name]
 * const split = (by: string) => (input: string) => input.split(by)
 * const join = (by: string) => (input: string[]) => input.join(by)
 * const newName = "index.ts"
 *
 * pipe(split(sep), dropLast, push(newName), join(sep))("src/utils/old.ts")
 * // => "src/utils/index.ts"
 *
 * @name pipe
 * @tag Function
 *
 * @see {@link pipeP}
 */
const pipe = ((...fns: unknown[]) => {
  if (fns.length === 0) {
    throw new TypeError(
      "@asd14/m/pipe: expected 'fns' to be 'NonEmpty', got 'Empty'"
    )
  }

  for (let index = 0, length = fns.length; index < length; index++) {
    if (typeof fns[index] !== "function") {
      throw new TypeError(
        `@asd14/m/pipe: expected 'fns[${index}]' to be 'Function', got '${type(fns[index])}'`
      )
    }
  }

  // Each item is a function, checked above
  return _pipe(fns as AnyMorphism[])
}) as PipeFn

export { pipe }
export type {
  PipeFn,
  PipeMorphisms1,
  PipeMorphisms2,
  PipeMorphisms3,
  PipeMorphisms4,
  PipePredicates1,
  PipePredicates2,
  PipePredicates3,
  PipePredicates4,
  PipePredicates5,
}
