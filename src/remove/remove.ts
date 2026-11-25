import { isEqual } from "../is-equal/is-equal.js"
import { type } from "../type/type.js"

type RemoveFn = {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters -- V constrains value to be subtype of T for mixed-type arrays
  <T, V extends T>(value: V, input: readonly T[]): T[]
  <T>(value: T): (input: readonly T[]) => T[]
}

const _remove = <T>(value: T, input: readonly T[]): T[] => {
  if (!Array.isArray(input)) {
    throw new TypeError(
      `@asd14/m/remove: expected 'input' to be 'Array', got '${type(input)}'`
    )
  }

  const result: T[] = []

  for (let i = 0, length = input.length; i < length; i++) {
    if (!isEqual(input[i], value)) {
      result.push(input[i] as T)
    }
  }

  return result
}

/**
 * Remove all occurrences of a value from an array. Compares with
 * SameValueZero, as `Array.prototype.includes`: `NaN` equals `NaN`.
 *
 * Input is never mutated - always returns a new array.
 *
 * @param {unknown} value - Value to remove
 * @param {Array} input - Source array
 *
 * @returns {Array} New array without the matching elements
 *
 * @example
 * remove(3, [1, 2, 3, 4, 3])
 * // => [1, 2, 4]
 *
 * remove("b")(["a", "b", "c"])
 * // => ["a", "c"]
 *
 * @name remove
 * @tag Array
 *
 * @see {@link removeWith}
 * @see {@link filter}
 * @see {@link filterWith}
 */
const remove = ((...params: unknown[]) => {
  const value = params[0]

  // @signature (value) => (input)
  if (params.length === 1) {
    return (input: readonly unknown[]) => _remove(value, input)
  }

  // @signature (value, input)
  return _remove(value, params[1] as readonly unknown[])
}) as RemoveFn

export { remove }
export type { RemoveFn }
