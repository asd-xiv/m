import { First, Length, Rest } from "../../types/array.js"
import { AnyMorphism, Morphism, UnaryMorphism } from "../../types/function.js"

type Curry<
  F extends AnyMorphism,
  P extends any[] = Parameters<F>,
  R = ReturnType<F>
> = Length<P> extends 0 | 1
  ? F
  : UnaryMorphism<First<P>, Curry<Morphism<Rest<P>, R>>>

export function curry<T extends AnyMorphism>(fn: T): Curry<T>
