import type { PlainObject } from "../../types/object.js"

import { isPlainObject } from "../is/is.js"
import { type } from "../type/type.js"
import { _setOwn } from "../utils/set-own.js"

type PickFn = {
  <T extends PlainObject, K extends keyof T>(
    keys: readonly K[],
    input: T
  ): Pick<T, K>
  <T extends PlainObject, K extends keyof T>(
    keys: readonly K[]
  ): (input: T) => Pick<T, K>
}

const _pick = <T extends PlainObject, K extends keyof T>(
  keys: readonly K[],
  input: T
): Pick<T, K> => {
  if (!isPlainObject(input)) {
    throw new TypeError(
      `@asd14/m/pick: expected 'input' to be 'Object', got '${type(input)}'`
    )
  }

  const result: PlainObject = {}

  for (let i = 0, length = keys.length; i < length; i++) {
    const key = keys[i]!

    if (Object.hasOwn(input, key)) {
      _setOwn(result, key as string, input[key])
    }
  }

  return result as Pick<T, K>
}

/**
 * Select a subset of keys from an object, returning a new object with
 * only those properties. Only own keys count: keys not present on the input,
 * or only on its prototype, are skipped.
 *
 * Input is never mutated - always returns a new object.
 *
 * @param {readonly string[]} keys - Array of property names to select
 * @param {Record<string, unknown>} input - Source object
 *
 * @returns {Object} A new object containing only the selected keys
 *
 * @example
 * pick(["name", "age"], { name: "Alice", age: 30, role: "admin" })
 * // => { name: "Alice", age: 30 }
 *
 * pick(["name", "age"])({ name: "Alice", age: 30, role: "admin" })
 * // => { name: "Alice", age: 30 }
 *
 * // In a pipe - extract relevant fields before processing
 * pipe(
 *   pick(["id", "name"]),
 *   JSON.stringify
 * )({ id: 1, name: "Alice", role: "admin" })
 * // => '{"id":1,"name":"Alice"}'
 *
 * @name pick
 * @tag Object
 *
 * @see {@link read}
 */
const pick = ((...params: unknown[]) => {
  const keys = params[0]

  if (!Array.isArray(keys)) {
    throw new TypeError(
      `@asd14/m/pick: expected 'keys' to be 'Array', got '${type(keys)}'`
    )
  }

  // @signature (keys) => (input)
  if (params.length === 1) {
    return (input: unknown) => _pick(keys as string[], input as PlainObject)
  }

  // @signature (keys, input)
  return _pick(keys as string[], params[1] as PlainObject)
}) as PickFn

export { pick }
export type { PickFn }
