import { UnaryPredicate, UnaryMorphism } from "../../types/function.js"

declare function all<T>(fn: UnaryPredicate<T>, input: T[]): boolean
declare function all<T>(fn: UnaryPredicate<T>): (input: T[]) => boolean

declare function all<T>(fns: [UnaryPredicate<T>], input: T[]): boolean
declare function all<T>(fns: [UnaryPredicate<T>]): (input: T[]) => boolean

declare function all<T1, T2>(
  fns: [UnaryMorphism<T1, T2>, UnaryPredicate<T2>],
  input: T1[]
): boolean
declare function all<T1, T2>(
  fns: [UnaryMorphism<T1, T2>, UnaryPredicate<T2>]
): (input: T1[]) => boolean

declare function all<T1, T2, T3>(
  fns: [UnaryMorphism<T1, T2>, UnaryMorphism<T2, T3>, UnaryPredicate<T3>],
  input: T1[]
): boolean
declare function all<T1, T2, T3>(
  fns: [UnaryMorphism<T1, T2>, UnaryMorphism<T2, T3>, UnaryPredicate<T3>]
): (input: T1[]) => boolean

declare function all<T1, T2, T3, T4>(
  fns: [
    UnaryMorphism<T1, T2>,
    UnaryMorphism<T2, T3>,
    UnaryMorphism<T3, T4>,
    UnaryPredicate<T4>
  ],
  input: T1[]
): boolean
declare function all<T1, T2, T3, T4>(
  fns: [
    UnaryMorphism<T1, T2>,
    UnaryMorphism<T2, T3>,
    UnaryMorphism<T3, T4>,
    UnaryPredicate<T4>
  ]
): (input: T1[]) => boolean

declare function all<T1, T2, T3, T4, T5>(
  fns: [
    UnaryMorphism<T1, T2>,
    UnaryMorphism<T2, T3>,
    UnaryMorphism<T3, T4>,
    UnaryMorphism<T4, T5>,
    UnaryPredicate<T5>
  ],
  input: T1[]
): boolean
declare function all<T1, T2, T3, T4, T5>(
  fns: [
    UnaryMorphism<T1, T2>,
    UnaryMorphism<T2, T3>,
    UnaryMorphism<T3, T4>,
    UnaryMorphism<T4, T5>,
    UnaryPredicate<T5>
  ]
): (input: T1[]) => boolean
