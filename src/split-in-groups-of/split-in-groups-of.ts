import { type } from "../type/type.js"

type SplitInGroupsOfFn = {
  // Uncurried
  <T>(size: number, input: readonly T[]): T[][]

  // Curried
  (size: number): <T>(input: readonly T[]) => T[][]
}

const _splitInGroupsOf = (
  size: number,
  input: readonly unknown[]
): unknown[][] => {
  if (!Array.isArray(input)) {
    throw new TypeError(
      `@asd14/m/splitInGroupsOf: expected 'input' to be 'Array', got '${type(input)}'`
    )
  }

  const result: unknown[][] = []
  const groupCount = Math.ceil(input.length / size)

  for (let i = 0; i < groupCount; ++i) {
    const startIndex = i * size
    const endIndex = (i + 1) * size

    result.push(input.slice(startIndex, endIndex))
  }

  return result
}

/**
 * Split an array into multiple arrays of a given size. The last group may
 * contain fewer elements if the array length is not evenly divisible.
 *
 * Input is never mutated - always returns a new array of new arrays.
 *
 * @param {number} size - Maximum number of elements per group (positive integer)
 * @param {Array} input - Source array to split
 *
 * @returns {Array[]} Array of sub-arrays, each containing at most `size` elements
 *
 * @example
 * splitInGroupsOf(2, [1, 2, 3, 4])
 * // => [[1, 2], [3, 4]]
 *
 * splitInGroupsOf(3)([1, 2, 3, 4, 5])
 * // => [[1, 2, 3], [4, 5]]
 *
 * // In a pipe - process items in batches
 * pipe(splitInGroupsOf(2), map(batch => batch.join("-")))([1, 2, 3, 4])
 * // => ["1-2", "3-4"]
 *
 * @name splitInGroupsOf
 * @tag Array
 *
 * @see {@link partition}
 */
const splitInGroupsOf = ((...params: unknown[]) => {
  const size = params[0] as number

  if (!Number.isInteger(size) || size <= 0) {
    throw new TypeError(
      `@asd14/m/splitInGroupsOf: expected 'size' to be 'PositiveInteger', got '${JSON.stringify(size)}'`
    )
  }

  // @signature (size, input)
  if (params.length >= 2) {
    return _splitInGroupsOf(size, params[1] as unknown[])
  }

  // @signature (size) => (input)
  return (input: unknown[]) => _splitInGroupsOf(size, input)
}) as SplitInGroupsOfFn

export { splitInGroupsOf }
export type { SplitInGroupsOfFn }
