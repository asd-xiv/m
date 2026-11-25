import { isEqual } from "../is-equal/is-equal.js"
import { type } from "../type/type.js"
import { distinctBy } from "./by/distinct-by.js"

/**
 * Remove duplicate values from an array. Compares with SameValueZero, as
 * `Array.prototype.includes`: `NaN` equals `NaN`. Order is preserved - first
 * occurrence wins.
 *
 * Input is never mutated - always returns a new array.
 *
 * @param {Array} input - Array to deduplicate
 *
 * @returns {Array} New array with duplicates removed
 *
 * @example
 * distinct([1, 2, 2, 3, 1, 3])
 * // => [1, 2, 3]
 *
 * distinct([NaN, 1, NaN, 2])
 * // => [NaN, 1, 2]
 *
 * // In a pipe
 * pipe(map(read("tagId")), distinct)([
 *   { tagId: 1 }, { tagId: 2 }, { tagId: 1 }
 * ])
 * // => [1, 2]
 *
 * @name distinct
 * @tag Array
 *
 * @see {@link distinctBy}
 * @see {@link unite}
 */
const distinct = <T>(input: readonly T[]): T[] => {
  if (!Array.isArray(input)) {
    throw new TypeError(
      `@asd14/m/distinct: expected 'input' to be 'Array', got '${type(input)}'`
    )
  }

  return distinctBy<T>(isEqual, input)
}

export { distinct }
