import { PlainObject } from "./object.js"

export type Morphism<I extends unknown[], O> = (...input: I) => O
export type UnaryMorphism<I, O> = (input: I) => O

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Catch-all type
export type AnyMorphism = (...params: any[]) => any

export type Predicate<T extends unknown[]> = Morphism<T, boolean>
export type UnaryPredicate<T> = UnaryMorphism<T, boolean>

/**
 * A chain of unary morphisms where each function's output feeds the next.
 * `MorphismPipe<I, O>` starts with type `I` and ends with type `O`,
 * intermediates can be any type.
 *
 * Up to 5 functions in the chain.
 */
/* eslint-disable @typescript-eslint/no-explicit-any -- intermediates are existential */
export type MorphismPipe<TIn, TOut> =
  | [UnaryMorphism<TIn, TOut>]
  | [UnaryMorphism<TIn, any>, UnaryMorphism<any, TOut>]
  | [UnaryMorphism<TIn, any>, UnaryMorphism<any, any>, UnaryMorphism<any, TOut>]
  | [
      UnaryMorphism<TIn, any>,
      UnaryMorphism<any, any>,
      UnaryMorphism<any, any>,
      UnaryMorphism<any, TOut>,
    ]
  | [
      UnaryMorphism<TIn, any>,
      UnaryMorphism<any, any>,
      UnaryMorphism<any, any>,
      UnaryMorphism<any, any>,
      UnaryMorphism<any, TOut>,
    ]
/* eslint-enable @typescript-eslint/no-explicit-any */

/**
 * Endomorphic pipe chain: `T → ... → T`. A special case of `MorphismPipe`
 * where input and output types are the same.
 */
export type EndomorphismPipe<T> = MorphismPipe<T, T>

/**
 * A pipe chain ending in a predicate: `T → ... → boolean`.
 * Used by matchers to compose transforms before a final boolean test.
 */
export type PredicatePipe<T> = MorphismPipe<T, boolean>

/**
 * A patch applied to a single object key. Either:
 * - a literal replacement value of type `TOut`, never an array: m reads an
 *   array in a function slot as a pipe. Set an array with `() => [...]`
 * - a function `(currentValue: TIn, source: TSource) => TOut`
 */
export type KeyMorphism<TIn, TOut, TSource extends PlainObject> =
  | Exclude<TOut, readonly unknown[]>
  | ((currentValue: TIn, source: TSource) => TOut)
