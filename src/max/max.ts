import { type } from "../type/type.js"

type MaxFn = (input: readonly number[]) => number | undefined

const _max = (input: unknown): number | undefined => {
  if (!Array.isArray(input)) {
    throw new TypeError(
      `@asd14/m/max: expected 'input' to be 'Array', got '${type(input)}'`
    )
  }

  let result: number | undefined

  for (let i = 0, length = input.length; i < length; i++) {
    const item: unknown = input[i]

    if (typeof item !== "number") {
      throw new TypeError(
        `@asd14/m/max: expected 'input[${i}]' to be 'Number', got '${type(item)}'`
      )
    }

    // NaN cannot be ordered, so it never wins
    if (!Number.isNaN(item) && (result === undefined || item > result)) {
      result = item
    }
  }

  return result
}

/**
 * Find the largest number of an array. Skips a `NaN` item, and returns
 * `undefined` when no number is left. Throws on an item that is not a number.
 *
 * Input is never mutated.
 *
 * @param {readonly Array} input - Array of numbers
 *
 * @returns {number|undefined} The largest number, or `undefined`
 *
 * @example
 * max([3, 1, 4, 1, 5])
 * // => 5
 *
 * max([])
 * // => undefined
 *
 * max([1, NaN, 2])
 * // => 2
 *
 * pipe(map(read("score")), max)([{ score: 1 }, { score: 7 }])
 * // => 7
 *
 * @name max
 * @tag Number
 *
 * @see {@link min}
 * @see {@link maxBy}
 * @see {@link sum}
 */
const max = _max as MaxFn

export { max }
export type { MaxFn }
