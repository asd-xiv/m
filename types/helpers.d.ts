/**
 * Object
 */

type Property = string | number | symbol
type Path = Property | Property[]

type Object = Record<Property, any>
type Dictionary<T> = Record<Property, T>

type Merge<T, U> = Omit<T, keyof U> & U
type DeepPartial<T> = { [K in keyof T]?: DeepPartial<T[K]> }

type HasAnyKeys<T> = {
  [property in keyof T]?: unknown
}

/**
 * Functions
 */

type Morphism<I extends any[], O> = (...input: I) => O
type UnaryMorphism<I, O> = (input: I) => O

type Predicate<T extends any[]> = Morphism<T, boolean>
type PredicatePipe = [...top: Morphism[], last: Predicate]

/**
 * Arrays
 */

type DropFirst<T extends unknown[]> = T extends [
  first: unknown,
  ...rest: infer U
]
  ? U
  : T

type FirstOf<T extends unknown[]> = T[0]
type LastOf<T extends unknown[]> = T[DropFirst<T>["length"]]
