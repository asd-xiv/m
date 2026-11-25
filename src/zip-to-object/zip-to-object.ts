import { type } from "../type/type.js"
import { _setOwn } from "../utils/set-own.js"

type ZipToObjectFn = {
  <K extends string, V>(keys: readonly K[], values: readonly V[]): Record<K, V>
  <K extends string>(
    keys: readonly K[]
  ): <V>(values: readonly V[]) => Record<K, V>
}

const _zipToObject = <K extends string, V>(
  keys: readonly K[],
  values: readonly V[]
): Record<K, V> => {
  if (!Array.isArray(values)) {
    throw new TypeError(
      `@asd14/m/zipToObject: expected 'values' to be 'Array', got '${type(values)}'`
    )
  }

  const result: Record<string, unknown> = {}
  const length = Math.min(keys.length, values.length)

  for (let i = 0; i < length; i++) {
    _setOwn(result, keys[i]!, values[i])
  }

  // Each key of `keys` holds the value at its index
  return result as Record<K, V>
}

/**
 * Create an object from two arrays, one containing keys, the other values.
 * Both arrays will be trimmed to the smallest length. A `"__proto__"` key stays
 * an own key.
 *
 * Input is never mutated - always returns a new object.
 *
 * @param {readonly string[]} keys - Array of property names
 * @param {readonly unknown[]} values - Array of property values
 *
 * @returns {Object} An object mapping each key to its corresponding value
 *
 * @example
 * zipToObject(["a", "b"], [1, 2])
 * // => { a: 1, b: 2 }
 *
 * zipToObject(["a"])([1, 2])
 * // => { a: 1 }
 *
 * // In a pipe - build an object from parallel arrays, then keep some keys
 * pipe(
 *   zipToObject(["host", "port", "protocol"]),
 *   pick(["host", "port"])
 * )(["localhost", 3000, "https"])
 * // => { host: "localhost", port: 3000 }
 *
 * @name zipToObject
 * @tag Array
 * @alias zipToObj
 *
 * @see {@link pick}
 */
const zipToObject = ((...params: unknown[]) => {
  const keys = params[0]

  if (!Array.isArray(keys)) {
    throw new TypeError(
      `@asd14/m/zipToObject: expected 'keys' to be 'Array', got '${type(keys)}'`
    )
  }

  // @signature (keys) => (values)
  if (params.length === 1) {
    return <V>(values: readonly V[]) => _zipToObject(keys as string[], values)
  }

  // @signature (keys, values)
  return _zipToObject(keys as string[], params[1] as unknown[])
}) as ZipToObjectFn

export { zipToObject, zipToObject as zipToObj }
export type { ZipToObjectFn }
