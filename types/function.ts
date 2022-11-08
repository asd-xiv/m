export type Morphism<I extends any[], O> = (...input: I) => O
export type UnaryMorphism<I, O> = (input: I) => O

export type AnyMorphism = Morphism<any[], any>

export type Predicate<T extends any[]> = Morphism<T, boolean>
export type UnaryPredicate<T> = UnaryMorphism<T, boolean>
