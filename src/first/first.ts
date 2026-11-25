import { type } from "../type/type.js"

type FirstFn = {
  <T>(input: readonly T[]): T | undefined
  (input: string): string | undefined
}

/**
 * Get the first element of an array or the first character of a string.
 *
 * @param {readonly T[] | string} input - The source sequence
 *
 * @returns {T | string | undefined} The first element/character or undefined
 * if empty
 *
 * @example
 * first([1, 2, 3])
 * // => 1
 *
 * first("xyz")
 * // => "x"
 *
 * first([])
 * // => undefined
 *
 * // In a pipe
 * pipe(
 *   filter(isSomething),
 *   first
 * )(items)
 *
 * @name first
 * @tag Array
 * @alias head
 *
 * @see {@link last}
 */
const first = ((input: unknown) => {
  if (!Array.isArray(input) && typeof input !== "string") {
    throw new TypeError(
      `@asd14/m/first: expected 'input' to be 'Array' or 'String', got '${type(input)}'`
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- guarded by the check above
  return input.length === 0 ? undefined : input[0]
}) as FirstFn

export { first, first as head }
export type { FirstFn }
