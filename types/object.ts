import { Property } from "./basic.js"

export type PlainObject = Record<string, unknown>

/**
 * Merge two types, with properties from U overriding properties from T.
 *
 * @example
 * type User = { id: number; name: string; email: string }
 * type UserUpdate = { name?: string; age: number }
 *
 * Merge<User, UserUpdate>
 * // => {
 * //   id: number
 * //   email: string
 * //   name?: string
 * //   age: number
 * // }
 */
export type Merge<T, U> = Omit<T, keyof U> & U

/**
 * Make all properties in T optional recursively.
 *
 * @example
 * type Config = {
 *   database: {
 *     host: string
 *   }
 *   cache: boolean
 * }
 *
 * DeepPartial<Config>
 * // => {
 * //   database?: {
 * //     host?: string
 * //   }
 * //   cache?: boolean
 * // }
 */
export type DeepPartial<T> = T extends object
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : T

/**
 * Resolve the type at a given path in T.
 *
 * @example
 * DeepValue<{ name: string }, ["name"]>
 * // => string
 *
 * DeepValue<{ a: { b: number } }, ["a", "b"]>
 * // => number
 *
 * DeepValue<number[][], [number, number]>
 * // => number
 *
 * DeepValue<{ a: string }, ["b"]>
 * // => undefined
 */
export type DeepValue<
  T,
  Path extends readonly Property[],
> = Path extends readonly [infer First, ...infer Rest]
  ? First extends keyof T
    ? Rest extends readonly Property[]
      ? DeepValue<T[First], Rest>
      : T[First]
    : undefined
  : T

/**
 * Resolve the type of all values of an object (union)
 *
 * @example
 * DeepValues<{ a: number, b: string }>
 * // => number | string
 *
 * DeepValues<{ a: number, b: { c: string[] } }>
 * // => number | string[]
 */
export type DeepValues<T extends PlainObject> = {
  [K in keyof T]: T[K] extends PlainObject ? DeepValues<T[K]> : T[K]
}[keyof T]
