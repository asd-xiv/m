import { type } from "../type/type.js"

type CountFn = {
  (input: readonly unknown[]): number
  (input: string): number
}

/**
 * Get the number of elements in an array or the number of characters in a
 * string.
 *
 * @param {readonly T[] | string} input - The source sequence
 *
 * @returns {number} The length of the sequence
 *
 * @example
 * count([1, 2, 3])
 * // => 3
 *
 * count("hello")
 * // => 5
 *
 * count([])
 * // => 0
 *
 * pipe(
 *   filter(isSomething),
 *   count
 * )([1, null, 3, undefined])
 * // => 2
 *
 * @name count
 * @tag Array
 * @alias length
 * @alias size
 *
 * @see {@link countBy}
 * @see {@link countWith}
 */
const count = ((input: unknown) => {
  if (!Array.isArray(input) && typeof input !== "string") {
    throw new TypeError(
      `@asd14/m/count: expected 'input' to be 'Array' or 'String', got '${type(input)}'`
    )
  }

  return input.length
}) as CountFn

export { count, count as length, count as size }
export type { CountFn }
