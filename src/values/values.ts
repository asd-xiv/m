import { isPlainObject } from "../is/is.js"
import { type } from "../type/type.js"

type ValuesFn = {
  <T>(input: readonly T[]): T[]
  <T extends Record<string, unknown>>(input: T): T[keyof T][]
}

/**
 * Get list of own enumerable property values.
 *
 * Returns the items of an array, the values of a plain object in key order.
 * Any other object throws, eg. a `Map`: read its values with
 * `[...map.values()]`.
 *
 * @param {Array|Object} input - Array or Object to extract values from
 *
 * @returns {Array} List of values
 *
 * @throws {TypeError} If input is not an Array or Object
 *
 * @example
 * values(["lorem", "ipsum"])
 * // => ["lorem", "ipsum"]
 *
 * values({ foo: "bar", lorem: "ipsum" })
 * // => ["bar", "ipsum"]
 *
 * values(new Map([["foo", "bar"]]))
 * // throws "@asd14/m/values: expected 'input' to be 'Array' or 'Object', got 'Map'"
 *
 * // In a pipe - sum the values of an object
 * pipe(
 *   values,
 *   sum
 * )({ a: 1, b: 2, c: 3 })
 * // => 6
 *
 * @name values
 * @tag Object
 *
 * @see {@link keys}
 */
const values = ((input: unknown) => {
  // A Map, a Set or a class instance throws: `[]` for a Map would look like an
  // answer. Read a Map's values with `[...map.values()]`
  if (!Array.isArray(input) && !isPlainObject(input)) {
    throw new TypeError(
      `@asd14/m/values: expected 'input' to be 'Array' or 'Object', got '${type(input)}'`
    )
  }

  const result: unknown[] = Object.values(input)

  return result
}) as ValuesFn

export { values }
export type { ValuesFn }
