import { type } from "../type/type.js"

type MinFn = (input: readonly number[]) => number | undefined

const _min = (input: unknown): number | undefined => {
  if (!Array.isArray(input)) {
    throw new TypeError(
      `@asd14/m/min: expected 'input' to be 'Array', got '${type(input)}'`
    )
  }

  let result: number | undefined

  for (let i = 0, length = input.length; i < length; i++) {
    const item: unknown = input[i]

    if (typeof item !== "number") {
      throw new TypeError(
        `@asd14/m/min: expected 'input[${i}]' to be 'Number', got '${type(item)}'`
      )
    }

    // NaN cannot be ordered, so it never wins
    if (!Number.isNaN(item) && (result === undefined || item < result)) {
      result = item
    }
  }

  return result
}

/**
 * Find the smallest number of an array. Skips a `NaN` item, and returns
 * `undefined` when no number is left. Throws on an item that is not a number.
 *
 * Input is never mutated.
 *
 * @param {readonly Array} input - Array of numbers
 *
 * @returns {number|undefined} The smallest number, or `undefined`
 *
 * @example
 * min([3, 1, 4, 1, 5])
 * // => 1
 *
 * min([])
 * // => undefined
 *
 * min([1, NaN, 2])
 * // => 1
 *
 * pipe(map(read("score")), min)([{ score: 1 }, { score: 7 }])
 * // => 1
 *
 * @name min
 * @tag Number
 *
 * @see {@link max}
 * @see {@link minBy}
 * @see {@link sum}
 */
const min = _min as MinFn

export { min }
export type { MinFn }
