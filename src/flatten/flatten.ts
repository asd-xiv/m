import type { PlainObject } from "../../types/object.js"

import { isPlainObject } from "../is/is.js"
import { type } from "../type/type.js"
import { _setOwn } from "../utils/set-own.js"

type DeepFlatten<T> = T extends readonly (infer U)[] ? DeepFlatten<U> : T

// Flattens `Level` nested levels. A `level` that is not a literal number is
// unknown at the type level, so the elements are `unknown`
type FlattenLevel<
  T,
  Level extends number,
  Depth extends unknown[] = [],
> = number extends Level
  ? unknown
  : T extends readonly (infer U)[]
    ? Depth["length"] extends Level
      ? T
      : FlattenLevel<U, Level, [...Depth, unknown]>
    : T

type FlattenObjectOptions = { separator: string }

type FlattenFn = {
  // With array options
  <T, const Level extends number>(
    options: { level: Level },
    input: readonly T[]
  ): FlattenLevel<T, Level>[]

  // With object options
  (options: FlattenObjectOptions, input: PlainObject): PlainObject

  // Array, no options
  <T>(input: readonly T[]): DeepFlatten<T>[]

  // Object, no options
  (input: PlainObject): PlainObject
}

// Pushes into `result`: a spread of a large child array into `push` would
// overflow the call stack
const _flattenArray = (
  input: readonly unknown[],
  level: number,
  result: unknown[] = []
): unknown[] => {
  for (let i = 0, length = input.length; i < length; i++) {
    const item = input[i]

    if (level > 0 && Array.isArray(item)) {
      _flattenArray(item, level - 1, result)
    } else {
      result.push(item)
    }
  }

  return result
}

// `ancestors` holds the objects above `input`: an object that contains itself
// is kept as a leaf
const _flattenObject = (
  input: PlainObject,
  separator: string,
  prefix: string | undefined,
  result: PlainObject,
  ancestors: WeakSet<object>
): PlainObject => {
  ancestors.add(input)

  const keys = Object.keys(input)

  for (let i = 0, length = keys.length; i < length; i++) {
    const key = keys[i]!
    const value = input[key]
    const fullKey = prefix === undefined ? key : `${prefix}${separator}${key}`

    // An empty object is a leaf, so `unflatten` can restore it
    if (
      isPlainObject(value) &&
      Object.keys(value).length !== 0 &&
      !ancestors.has(value)
    ) {
      _flattenObject(value, separator, fullKey, result, ancestors)
    } else {
      // A key that contains the separator lands on the key of a nested path,
      // eg. "user.role" and { user: { role } }. Throw, as unflatten does,
      // rather than let the last one win
      if (Object.hasOwn(result, fullKey)) {
        throw new TypeError(
          `@asd14/m/flatten: expected '${fullKey}' to be 'Unique', got 'Duplicate'`
        )
      }

      _setOwn(result, fullKey, value)
    }
  }

  ancestors.delete(input)

  return result
}

const _flatten = (
  input: unknown,
  level: number,
  separator: string
): unknown => {
  if (Array.isArray(input)) return _flattenArray(input, level)
  if (isPlainObject(input))
    return _flattenObject(input, separator, undefined, {}, new WeakSet())

  throw new TypeError(
    `@asd14/m/flatten: expected 'input' to be 'Array' or 'Object', got '${type(input)}'`
  )
}

/**
 * Recursively flatten nested arrays or objects.
 *
 * For arrays, concatenates all nested arrays into a single flat array.
 * For objects, joins nested keys with a separator into a flat structure.
 *
 * It recurses, so the stack limits the depth: an object nested a few thousand
 * levels deep throws a `RangeError`. `JSON.parse` accepts any depth, so check
 * the depth of untrusted input first, if it can be that deep.
 *
 * Input is never mutated - always returns a new array or object.
 *
 * Only a plain object is flattened. An empty object, a `Date`, a `Map` and a
 * class instance stay as values, and so does an object that contains itself.
 * `level` counts the array levels to flatten, `Infinity` by default.
 *
 * Options go only in the two-argument form. With one argument, `flatten`
 * flattens it, even an object with a `level` or `separator` key.
 *
 * @param {Object} [options] - { level: number } for arrays, { separator: string } for objects
 * @param {Array|Object} input - Array or object to flatten
 *
 * @returns {Array|Object} Flattened result
 *
 * @throws {TypeError} When two entries flatten to the same key, eg. the key
 * `"user.role"` next to `{ user: { role } }`
 *
 * @example
 * flatten([1, [2], [3, [4]]])
 * // => [1, 2, 3, 4]
 *
 * flatten({ a: { b: 1, c: { d: 2 } } })
 * // => { "a.b": 1, "a.c.d": 2 }
 *
 * flatten({ level: 1 }, [1, [2, [3]]])
 * // => [1, 2, [3]]
 *
 * flatten({ separator: "__" }, { a: { b: 1 } })
 * // => { a__b: 1 }
 *
 * flatten({ a: {}, b: { c: new Date(0) } })
 * // => { a: {}, "b.c": new Date(0) }
 *
 * pipe(
 *   map(read("tags")),
 *   flatten,
 *   distinct
 * )([{ tags: ["a"] }, { tags: ["a", "b"] }])
 * // => ["a", "b"]
 *
 * @name flatten
 * @tag Array
 *
 * @see {@link unflatten}
 */
const flatten = ((...params: unknown[]) => {
  // @signature (input)
  if (params.length === 1) {
    return _flatten(params[0], Infinity, ".")
  }

  const options = params[0]

  if (!isPlainObject(options)) {
    throw new TypeError(
      `@asd14/m/flatten: expected 'options' to be 'Object', got '${type(options)}'`
    )
  }

  const { level = Infinity, separator = "." } = options

  if (typeof level !== "number") {
    throw new TypeError(
      `@asd14/m/flatten: expected 'level' to be 'Number', got '${type(level)}'`
    )
  }

  if (typeof separator !== "string") {
    throw new TypeError(
      `@asd14/m/flatten: expected 'separator' to be 'String', got '${type(separator)}'`
    )
  }

  // @signature (options, input)
  return _flatten(params[1], level, separator)
}) as unknown as FlattenFn

export { flatten }
export type { FlattenFn }
