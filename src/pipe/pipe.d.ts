import { Morphism, UnaryMorphism } from "../../types/function.js"

export function pipe<I extends any[], O>(
  fn1: Morphism<I, O>
): (...input: I) => O
export function pipe<I extends any[], T1, O>(
  fn1: Morphism<I, T1>,
  fn2: UnaryMorphism<T1, O>
): (...input: I) => O
export function pipe<I extends any[], T1, T2, O>(
  fn1: Morphism<I, T1>,
  fn2: UnaryMorphism<T1, T2>,
  fn3: UnaryMorphism<T2, O>
): (...input: I) => O
export function pipe<I extends any[], T1, T2, T3, O>(
  fn1: Morphism<I, T1>,
  fn2: UnaryMorphism<T1, T2>,
  fn3: UnaryMorphism<T2, T3>,
  fn4: UnaryMorphism<T3, O>
): (...input: I) => O
export function pipe<I extends any[], T1, T2, T3, T4, O>(
  fn1: Morphism<I, T1>,
  fn2: UnaryMorphism<T1, T2>,
  fn3: UnaryMorphism<T2, T3>,
  fn4: UnaryMorphism<T3, T4>,
  fn5: UnaryMorphism<T4, O>
): (...input: I) => O
export function pipe<I extends any[], T1, T2, T3, T4, T5, O>(
  fn1: Morphism<I, T1>,
  fn2: UnaryMorphism<T1, T2>,
  fn3: UnaryMorphism<T2, T3>,
  fn4: UnaryMorphism<T3, T4>,
  fn5: UnaryMorphism<T4, T5>,
  fn6: UnaryMorphism<T5, O>
): (...input: I) => O
export function pipe<I extends any[], T1, T2, T3, T4, T5, T6, O>(
  fn1: Morphism<I, T1>,
  fn2: UnaryMorphism<T1, T2>,
  fn3: UnaryMorphism<T2, T3>,
  fn4: UnaryMorphism<T3, T4>,
  fn5: UnaryMorphism<T4, T5>,
  fn6: UnaryMorphism<T5, T6>,
  fn7: UnaryMorphism<T6, O>
): (...input: I) => O
export function pipe<I extends any[], T1, T2, T3, T4, T5, T6, T7, O>(
  fn1: Morphism<I, T1>,
  fn2: UnaryMorphism<T1, T2>,
  fn3: UnaryMorphism<T2, T3>,
  fn4: UnaryMorphism<T3, T4>,
  fn5: UnaryMorphism<T4, T5>,
  fn6: UnaryMorphism<T5, T6>,
  fn7: UnaryMorphism<T6, T7>,
  fn8: UnaryMorphism<T7, O>
): (...input: I) => O
export function pipe<I extends any[], T1, T2, T3, T4, T5, T6, T7, T8, O>(
  fn1: Morphism<I, T1>,
  fn2: UnaryMorphism<T1, T2>,
  fn3: UnaryMorphism<T2, T3>,
  fn4: UnaryMorphism<T3, T4>,
  fn5: UnaryMorphism<T4, T5>,
  fn6: UnaryMorphism<T5, T6>,
  fn7: UnaryMorphism<T6, T7>,
  fn8: UnaryMorphism<T7, T8>,
  fn9: UnaryMorphism<T8, O>
): (...input: I) => O
export function pipe<I extends any[], T1, T2, T3, T4, T5, T6, T7, T8, T9>(
  fn1: Morphism<I, T1>,
  fn2: UnaryMorphism<T1, T2>,
  fn3: UnaryMorphism<T2, T3>,
  fn4: UnaryMorphism<T3, T4>,
  fn5: UnaryMorphism<T4, T5>,
  fn6: UnaryMorphism<T5, T6>,
  fn7: UnaryMorphism<T6, T7>,
  fn8: UnaryMorphism<T7, T8>,
  fn9: UnaryMorphism<T8, T9>,
  ...fns: UnaryMorphism<any, any>[]
): (...input: I) => unknown
