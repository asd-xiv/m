import { type } from "../type/type.js"

type IntersectFn = {
  <T>(a: readonly T[], b: readonly T[]): T[]
  <T>(a: readonly T[]): (b: readonly T[]) => T[]
}

const _intersect = (a: readonly unknown[], b: unknown): unknown[] => {
  if (!Array.isArray(b)) {
    throw new TypeError(
      `@asd14/m/intersect: expected 'b' to be 'Array', got '${type(b)}'`
    )
  }

  const inB = new Set<unknown>(b as readonly unknown[])
  const seen = new Set<unknown>()
  const result: unknown[] = []

  for (let index = 0, length = a.length; index < length; index++) {
    const item: unknown = a[index]

    if (inB.has(item) && !seen.has(item)) {
      seen.add(item)
      result.push(item)
    }
  }

  return result
}

/**
 * Set intersection of two arrays. Returns a new array of the distinct items
 * present in both arrays, compared with SameValueZero (`NaN` equals `NaN`).
 * Order is preserved - items appear in the order of the first array.
 *
 * Input is never mutated - always returns a new array.
 *
 * @param {Array} a - First array
 * @param {Array} b - Second array
 *
 * @returns {Array} New array of the distinct items present in both arrays
 *
 * @example
 * intersect([1, 2, 3], [3, 2, 5])
 * // => [2, 3]
 *
 * intersect([1, 1, 2])([2, 1])
 * // => [1, 2]
 *
 * intersect([NaN, 1], [NaN, 2])
 * // => [NaN]
 *
 * // In a pipe - keep the known ids among the ids of new items
 * pipe(
 *   map(read("id")),
 *   intersect([1, 2])
 * )([{ id: 2 }, { id: 3 }])
 * // => [2]
 *
 * @name intersect
 * @tag Array
 *
 * @see {@link intersectBy}
 * @see {@link unite}
 */
const intersect = ((...params: unknown[]) => {
  if (!Array.isArray(params[0])) {
    throw new TypeError(
      `@asd14/m/intersect: expected 'a' to be 'Array', got '${type(params[0])}'`
    )
  }

  // @signature (a) => (b)
  if (params.length === 1) {
    return (b: unknown) => _intersect(params[0] as unknown[], b)
  }

  // @signature (a, b)
  return _intersect(params[0] as unknown[], params[1])
}) as IntersectFn

export { intersect }
export type { IntersectFn }
