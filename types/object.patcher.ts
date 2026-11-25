import type { KeyMorphism, MorphismPipe } from "./function.js"
import type { PlainObject } from "./object.js"

// -- update: write keys of T, keep T ------------------------------------------

/**
 * A patch of one key that keeps its type: a value, a function
 * `(currentValue, source) => newValue` or a pipe array
 */
type KeyPatcher<TValue, TSource extends PlainObject> =
  KeyMorphism<TValue, TValue, TSource> | MorphismPipe<TValue, TValue>

/** The patcher of `update`: it names only keys of `T`, and keeps their types */
type Patcher<T extends PlainObject> = {
  [K in keyof T]?: KeyPatcher<T[K], T>
}

// -- evolve: change the types of keys T has -----------------------------------

/** A function or a pipe array that turns one key's value into a new value */
type KeyEvolver<TValue, TSource extends PlainObject> =
  | ((currentValue: TValue, source: TSource) => unknown)
  | MorphismPipe<TValue, unknown>

/** The patcher of `evolve`: functions only, on keys of `T` */
type Evolver<T extends PlainObject> = {
  [K in keyof T]?: KeyEvolver<T[K], T>
}

/** What one patch returns: a function's return, or a pipe's last function's */
type EvolvedValue<TPatch, TFallback> = TPatch extends readonly [
  ...unknown[],
  infer Last,
]
  ? Last extends (...params: never[]) => infer R
    ? R
    : TFallback
  : TPatch extends (...params: never[]) => infer R
    ? R
    : TFallback

/** `T` with each key the patcher names turned into the type its patch returns */
type Evolved<T extends PlainObject, P> = {
  [K in keyof T]: K extends keyof P ? EvolvedValue<P[K], T[K]> : T[K]
}

/** A patcher before `T` is known, in a curried call */
type AnyEvolver = Record<
  string,
  | ((currentValue: never, source: never) => unknown)
  | MorphismPipe<never, unknown>
>

/**
 * A patcher before `T` is known, in a curried call: a primitive, a plain
 * object, a function or a pipe array per key, never an array of values
 */
type AnyPatcher = Record<
  string,
  | string
  | number
  | bigint
  | boolean
  | symbol
  | null
  | undefined
  | PlainObject
  | ((currentValue: never, source: never) => unknown)
  | MorphismPipe<never, unknown>
>

export type {
  AnyEvolver,
  AnyPatcher,
  Evolved,
  EvolvedValue,
  Evolver,
  KeyEvolver,
  KeyMorphism,
  KeyPatcher,
  MorphismPipe,
  Patcher,
}
