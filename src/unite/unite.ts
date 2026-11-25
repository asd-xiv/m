import { distinct } from "../distinct/distinct.js"
import { type } from "../type/type.js"

type UniteFn = {
  <T>(a: readonly T[], b: readonly T[]): T[]
  <T>(a: readonly T[]): (b: readonly T[]) => T[]
}

const _unite = <T>(a: readonly T[], b: readonly T[]): T[] => {
  if (!Array.isArray(b)) {
    throw new TypeError(
      `@asd14/m/unite: expected 'b' to be 'Array', got '${type(b)}'`
    )
  }

  const items: unknown[] = [...a, ...(b as readonly unknown[])]

  return distinct(items) as T[]
}

/**
 * Set union of two arrays. Returns a new array containing all unique items
 * from both arrays, compared with SameValueZero (`NaN` equals `NaN`). Order is preserved - items from
 * the first array appear first.
 *
 * Input is never mutated - always returns a new array.
 *
 * @param {Array} a - First array
 * @param {Array} b - Second array
 *
 * @returns {Array} New array of unique items from both arrays
 *
 * @example
 * unite([1, 2, 3], [2, 3, 4, 5])
 * // => [1, 2, 3, 4, 5]
 *
 * unite([1, 1, 2])([2, 3])
 * // => [1, 2, 3]
 *
 * unite([NaN, 1], [NaN, 2])
 * // => [NaN, 1, 2]
 *
 * // In a pipe - combine the existing ids with the ids of new items
 * pipe(
 *   map(read("id")),
 *   unite([1, 2])
 * )([{ id: 2 }, { id: 3 }])
 * // => [1, 2, 3]
 *
 * @name unite
 * @tag Array
 *
 * @see {@link uniteBy}
 * @see {@link distinct}
 */
const unite = ((...params: unknown[]) => {
  if (!Array.isArray(params[0])) {
    throw new TypeError(
      `@asd14/m/unite: expected 'a' to be 'Array', got '${type(params[0])}'`
    )
  }

  // @signature (a) => (b)
  if (params.length === 1) {
    return (b: unknown[]) => _unite(params[0] as unknown[], b)
  }

  // @signature (a, b)
  return _unite(params[0] as unknown[], params[1] as unknown[])
}) as UniteFn

export { unite }
export type { UniteFn }
