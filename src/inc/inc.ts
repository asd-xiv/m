import { type } from "../type/type.js"

/**
 * Add one to a number.
 *
 * @param {number} input - Number to increment
 *
 * @returns {number} The input plus one
 *
 * @example
 * inc(2)
 * // => 3
 *
 * map(inc, [1, 2, 3])
 * // => [2, 3, 4]
 *
 * pipe(find(x => x > 4), defaultTo(0), inc)([2, 4, 5])
 * // => 6
 *
 * @name inc
 * @tag Number
 */
const inc = (input: number): number => {
  if (typeof input !== "number") {
    throw new TypeError(
      `@asd14/m/inc: expected 'input' to be 'Number', got '${type(input)}'`
    )
  }

  return input + 1
}

export { inc }
