import { type } from "../type/type.js"

type LastFn = {
  <T>(input: readonly T[]): T | undefined
  (input: string): string | undefined
}

/**
 * Get the last element of an array or the last character of a string.
 *
 * @param {readonly T[] | string} input - The source sequence
 *
 * @returns {T | string | undefined} The last element/character or undefined
 * if empty
 *
 * @example
 * last([1, 2, 3])
 * // => 3
 *
 * last("xyz")
 * // => "z"
 *
 * last([])
 * // => undefined
 *
 * // In a pipe
 * pipe(
 *   filter(isSomething),
 *   last
 * )(items)
 *
 * @name last
 * @tag Array
 * @alias tail
 *
 * @see {@link first}
 */
const last = ((input: unknown) => {
  if (!Array.isArray(input) && typeof input !== "string") {
    throw new TypeError(
      `@asd14/m/last: expected 'input' to be 'Array' or 'String', got '${type(input)}'`
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- guarded by the check above
  return input.length === 0 ? undefined : input[input.length - 1]
}) as LastFn

export { last, last as tail }
export type { LastFn }
