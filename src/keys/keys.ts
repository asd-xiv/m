import { isPlainObject } from "../is/is.js"
import { type } from "../type/type.js"

type KeysFn = (input: readonly unknown[] | Record<string, unknown>) => string[]

/**
 * Get list of own enumerable property names.
 *
 * Returns string indices for arrays, key names for plain objects. Any other
 * object throws, eg. a `Map`: read its keys with `[...map.keys()]`.
 *
 * @param {Array|Object} input - Array or Object to extract keys from
 *
 * @returns {string[]} List of property names
 *
 * @throws {TypeError} If input is not an Array or Object
 *
 * @example
 * keys(["lorem", "ipsum"])
 * // => ["0", "1"]
 *
 * keys({ foo: "bar", lorem: "ipsum" })
 * // => ["foo", "lorem"]
 *
 * keys(new Map([["foo", "bar"]]))
 * // throws "@asd14/m/keys: expected 'input' to be 'Array' or 'Object', got 'Map'"
 *
 * @name keys
 * @tag Object
 */
const keys = ((input: unknown) => {
  // A Map, a Set or a class instance throws: `[]` for a Map would look like an
  // answer. Read a Map's keys with `[...map.keys()]`
  if (!Array.isArray(input) && !isPlainObject(input)) {
    throw new TypeError(
      `@asd14/m/keys: expected 'input' to be 'Array' or 'Object', got '${type(input)}'`
    )
  }

  return Object.keys(input)
}) as KeysFn

export { keys }
export type { KeysFn }
