import { type } from "../type/type.js"

/**
 * Subtract one from a number.
 *
 * @param {number} input - Number to decrement
 *
 * @returns {number} The input minus one
 *
 * @example
 * dec(3)
 * // => 2
 *
 * map(dec, [1, 2, 3])
 * // => [0, 1, 2]
 *
 * pipe(find(x => x > 4), defaultTo(0), dec)([2, 4, 5])
 * // => 4
 *
 * @name dec
 * @tag Number
 */
const dec = (input: number): number => {
  if (typeof input !== "number") {
    throw new TypeError(
      `@asd14/m/dec: expected 'input' to be 'Number', got '${type(input)}'`
    )
  }

  return input - 1
}

export { dec }
