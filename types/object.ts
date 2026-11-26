import { Property } from "./basic.js"

/**
 * Widen a literal type, as a `let` does: `"done"` to `string`, `0` to
 * `number`, `true` to `boolean`. Any other type stays as it is.
 */
type Widen<V> = V extends string
  ? string
  : V extends number
    ? number
    : V extends boolean
      ? boolean
      : V

/**
 * The type a written value gives its field: the field's own type when the
 * value fits it, else the value's widened type.
 */
type Fit<Current, V> = [V] extends [Current] ? Current : Widen<V>

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
 * Resolve the type of T after writing V at a given path. A missing step
 * becomes an array before an index segment, and an object before any other.
 * An index on an array widens its items to the old item or the written one.
 *
 * @example
 * DeepWrite<{ id: number; status: "todo" | "done" }, ["status"], "done">
 * // => { id: number; status: "todo" | "done" }, the value fits the field
 *
 * DeepWrite<{ id: number; name: string }, ["name"], boolean>
 * // => { id: number; name: boolean }, it does not
 *
 * DeepWrite<{ id: number }, ["tag"], "x">
 * // => { id: number; tag: string }, a new key widens the literal
 *
 * DeepWrite<{ a: { b: number; c: string } }, ["a", "b"], string>
 * // => { a: { b: string; c: string } }
 *
 * DeepWrite<{}, ["tags", 0], string>
 * // => { tags: string[] }
 *
 * DeepWrite<number[], [0], string>
 * // => (number | string)[]
 */
export type DeepWrite<
  T,
  Path extends readonly Property[],
  V,
> = Path extends readonly [
  infer First extends Property,
  ...infer Rest extends readonly Property[],
]
  ? T extends readonly (infer Item)[]
    ? First extends number
      ? Rest extends readonly []
        ? [V] extends [Item]
          ? Item[]
          : (Item | Widen<V>)[]
        : (Item | DeepWrite<Item, Rest, V>)[]
      : unknown
    : {
          [
            K in keyof T as [K] extends [First]
              ? [First] extends [K]
                ? never
                : K
              : K
          ]: T[K]
        } & {
          [K in First]: Rest extends readonly []
            ? First extends keyof T
              ? Fit<T[First], V>
              : Widen<V>
            : DeepWrite<
                First extends keyof T
                  ? | Exclude<T[First], undefined>
                    | (undefined extends T[First]
                        ? Rest extends readonly [number, ...unknown[]]
                          ? []
                          : object
                        : never)
                  : Rest extends readonly [number, ...unknown[]]
                    ? []
                    : object,
                Rest,
                V
              >
        } extends infer O
      ? { [K in keyof O]: O[K] }
      : never
  : unknown

/**
 * Resolve the type of all leaf values of an object (union). An array is not a
 * leaf: its items are. A recursive type, eg. a tree, stops after 10 levels,
 * which loses no leaf type, since each level adds the same ones
 *
 * @example
 * DeepValues<{ a: number, b: string }>
 * // => number | string
 *
 * DeepValues<{ a: number, b: { c: string[] } }>
 * // => number | string
 */
export type DeepValues<
  T extends PlainObject,
  Depth extends unknown[] = [],
> = Depth["length"] extends 10
  ? never
  : {
      // `infer` checks each member of a union on its own, so an optional
      // object, eg. `Peer | undefined`, is walked, not kept as a leaf. An array
      // goes back in as the one key of an object, so the items of a nested
      // array resolve the same way
      [K in keyof T]: T[K] extends infer Value
        ? Value extends readonly unknown[]
          ? DeepValues<{ item: Value[number] }, [...Depth, unknown]>
          : Value extends PlainObject
            ? DeepValues<Value, [...Depth, unknown]>
            : Value
        : never
    }[keyof T]
