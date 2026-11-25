import type { Merge, PlainObject } from "../../types/object.js"
import { isPlainObject } from "../is/is.js"
import { type } from "../type/type.js"

type MergeAll<T extends readonly PlainObject[]> = T extends readonly [
  infer Head extends PlainObject,
  ...infer Rest extends PlainObject[],
]
  ? Rest extends []
    ? Head
    : Merge<Head, MergeAll<Rest>>
  : PlainObject

type MergeFn = {
  // Variadic 2+: merge(a, b), merge(a, b, c), etc.
  <T extends [PlainObject, PlainObject, ...PlainObject[]]>(
    ...objects: T
  ): MergeAll<T>

  // Array: merge([a, b, c])
  <T extends readonly PlainObject[]>(objects: T): MergeAll<T>

  // Curried 1-arg: merge(defaults)(incoming) - must be last
  <A extends PlainObject>(
    first: A
  ): <B extends PlainObject>(second: B) => Merge<A, B>
}

const _merge = (objects: readonly PlainObject[]): PlainObject => {
  let result: PlainObject = {}

  for (const object of objects) {
    result = { ...result, ...object }
  }

  return result
}

/**
 * Shallow-merge objects left-to-right. Right-most properties win. Every item
 * must be a plain object, and a `"__proto__"` key stays an own key.
 *
 * Accepts variadic objects, an array of objects, or a single object
 * (curried, returns a function expecting the second object).
 *
 * Input is never mutated - always returns a new object.
 *
 * @param {Object} objects - Two or more objects to merge (variadic or array)
 *
 * @returns {Object} New object with all properties merged left-to-right
 *
 * @example
 * merge({ a: 1 }, { b: 2 }, { a: 3 })
 * // => { a: 3, b: 2 }
 *
 * merge([{ a: 1 }, { b: 2 }])
 * // => { a: 1, b: 2 }
 *
 * merge({ a: 1 })({ a: 2, b: 3 })
 * // => { a: 2, b: 3 }
 *
 * // In a pipe - the incoming object wins over the defaults
 * pipe(
 *   read("overrides"),
 *   merge({ host: "localhost", port: 3000 })
 * )({ overrides: { port: 8080 } })
 * // => { host: "localhost", port: 8080 }
 *
 * @name merge
 * @tag Object
 *
 * @see {@link mergeBy}
 */
const merge = ((...parameters: unknown[]) => {
  const first = parameters[0]

  if (!isPlainObject(first) && !Array.isArray(first)) {
    throw new TypeError(
      `@asd14/m/merge: expected 'first' to be 'Object' or 'Array', got '${type(first)}'`
    )
  }

  // @signature ([a, b, c])
  if (parameters.length === 1 && Array.isArray(first)) {
    for (let index = 0, length = first.length; index < length; index++) {
      if (!isPlainObject(first[index])) {
        throw new TypeError(
          `@asd14/m/merge: expected 'objects[${index}]' to be 'Object', got '${type(first[index])}'`
        )
      }
    }

    return _merge(first as PlainObject[])
  }

  // @signature (a) => (b)
  if (parameters.length === 1) {
    return (next: PlainObject) => {
      if (!isPlainObject(next)) {
        throw new TypeError(
          `@asd14/m/merge: expected 'second' to be 'Object', got '${type(next)}'`
        )
      }

      return _merge([first as PlainObject, next])
    }
  }

  // @signature (a, b, ...rest)
  for (let index = 0, length = parameters.length; index < length; index++) {
    if (!isPlainObject(parameters[index])) {
      throw new TypeError(
        `@asd14/m/merge: expected 'objects[${index}]' to be 'Object', got '${type(parameters[index])}'`
      )
    }
  }

  return _merge(parameters as PlainObject[])
}) as MergeFn

export { merge }
export type { MergeFn }
