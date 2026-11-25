import type { PlainObject } from "../../types/object.js"

import { isPlainObject } from "../is/is.js"
import { type } from "../type/type.js"
import { _setOwn } from "../utils/set-own.js"

type UnflattenFn = {
  // Uncurried
  (separator: string, input: PlainObject): PlainObject

  // Curried
  (separator: string): (input: PlainObject) => PlainObject

  // Default separator
  (input: PlainObject): PlainObject
}

const _unflatten = (separator: string, input: PlainObject): PlainObject => {
  if (!isPlainObject(input)) {
    throw new TypeError(
      `@asd14/m/unflatten: expected 'input' to be 'Object', got '${type(input)}'`
    )
  }

  const result: PlainObject = {}
  // The objects `unflatten` created for a prefix. A key descends only into
  // one of these, never into a value of the input
  const prefixes = new WeakSet<object>([result])

  for (const [key, value] of Object.entries(input)) {
    const parts = key.split(separator)
    let current = result

    for (let i = 0, length = parts.length - 1; i < length; i++) {
      const part = parts[i]!

      if (!Object.hasOwn(current, part)) {
        const prefix: PlainObject = {}

        prefixes.add(prefix)
        _setOwn(current, part, prefix)
      }

      const next = current[part]

      if (!isPlainObject(next) || !prefixes.has(next)) {
        throw new TypeError(
          `@asd14/m/unflatten: expected '${parts.slice(0, i + 1).join(separator)}' to be 'Prefix', got 'Leaf'`
        )
      }

      current = next
    }

    const lastPart = parts[parts.length - 1]!

    if (Object.hasOwn(current, lastPart)) {
      throw new TypeError(
        `@asd14/m/unflatten: expected '${key}' to be 'Leaf', got 'Prefix'`
      )
    }

    _setOwn(current, lastPart, value)
  }

  return result
}

/**
 * Convert a flat object with delimited keys into a nested object structure.
 * Inverse of `flatten` for objects.
 *
 * A key that is both a leaf and a prefix, eg. `a` and `a.b`, throws. A key with
 * a trailing separator keeps its value under an empty key.
 *
 * @param {string} [separator="."] - Delimiter used to split keys
 * @param {Object} input - Flat object to unflatten
 *
 * @returns {Object} Nested object
 *
 * @example
 * unflatten({ "a.b": 1, "a.c": 2 })
 * // => { a: { b: 1, c: 2 } }
 *
 * unflatten("__", { a__b: 1 })
 * // => { a: { b: 1 } }
 *
 * pipe(
 *   unflatten("__")
 * )({ "x__y__z": 42 })
 * // => { x: { y: { z: 42 } } }
 *
 * unflatten({ "a.": 1 })
 * // => { a: { "": 1 } }
 *
 * unflatten({ a: 1, "a.b": 2 })
 * // throws "@asd14/m/unflatten: expected 'a' to be 'Prefix', got 'Leaf'"
 *
 * @name unflatten
 * @tag Object
 *
 * @see {@link flatten}
 */
const unflatten = ((...params: unknown[]) => {
  // @signature (input)
  if (isPlainObject(params[0])) {
    return _unflatten(".", params[0])
  }

  if (typeof params[0] !== "string") {
    throw new TypeError(
      `@asd14/m/unflatten: expected 'input' to be 'String' or 'Object', got '${type(params[0])}'`
    )
  }

  const separator = params[0]

  // @signature (separator) => (input)
  if (params.length === 1) {
    return (input: PlainObject) => _unflatten(separator, input)
  }

  // @signature (separator, input)
  return _unflatten(separator, params[1] as PlainObject)
}) as UnflattenFn

export { unflatten }
export type { UnflattenFn }
