import type { EqualityFn } from "../../distinct/by/distinct-by.js"

import { type } from "../../type/type.js"

type IntersectByFn = {
  <T>(fn: EqualityFn<T>, a: readonly T[], b: readonly T[]): T[]
  <T>(fn: EqualityFn<T>, a: readonly T[]): (b: readonly T[]) => T[]
}

const _isEqualPair = (
  fn: EqualityFn<unknown>,
  x: unknown,
  y: unknown
): boolean => {
  const isEqual: unknown = fn(x, y)

  return isEqual === true
}

const _intersectBy = (
  fn: EqualityFn<unknown>,
  a: readonly unknown[],
  b: unknown
): unknown[] => {
  if (!Array.isArray(b)) {
    throw new TypeError(
      `@asd14/m/intersectBy: expected 'b' to be 'Array', got '${type(b)}'`
    )
  }

  const other = b as readonly unknown[]
  const result: unknown[] = []

  for (let index = 0, length = a.length; index < length; index++) {
    const item: unknown = a[index]

    if (
      other.some(candidate => _isEqualPair(fn, item, candidate)) &&
      !result.some(kept => _isEqualPair(fn, item, kept))
    ) {
      result.push(item)
    }
  }

  return result
}

/**
 * Set intersection of two arrays, with your own equality function. Returns a
 * new array of the items of the first array that have an equal item in the
 * second array, where the first of each group of equal items wins. Order is
 * preserved - items appear in the order of the first array.
 *
 * Input is never mutated - always returns a new array.
 *
 * @param {Function} fn - `(item, other) => boolean`, true when equal. A pair
 * is equal only when `fn` returns `true`
 * @param {Array} a - First array
 * @param {Array} [b] - Second array
 *
 * @returns {Array} New array of the items of the first array found in both
 *
 * @example
 * const byId = (a, b) => a.id === b.id
 *
 * intersectBy(byId, [{ id: 1, v: "a" }, { id: 2, v: "b" }], [{ id: 2, v: "c" }])
 * // => [{ id: 2, v: "b" }]
 *
 * intersectBy(byId, [{ id: 1, v: "a" }, { id: 2, v: "b" }])([{ id: 2, v: "c" }])
 * // => [{ id: 2, v: "b" }]
 *
 * // In a pipe - keep the known users among the fetched ones
 * pipe(
 *   read("users"),
 *   intersectBy(byId, [{ id: 1, v: "a" }, { id: 2, v: "b" }])
 * )({ users: [{ id: 2, v: "c" }, { id: 3, v: "d" }] })
 * // => [{ id: 2, v: "b" }]
 *
 * @name intersectBy
 * @tag Array
 *
 * @see {@link intersect}
 * @see {@link uniteBy}
 */
const intersectBy = ((...params: unknown[]) => {
  const fn = params[0]
  const a = params[1]

  if (typeof fn !== "function") {
    throw new TypeError(
      `@asd14/m/intersectBy: expected 'fn' to be 'Function', got '${type(fn)}'`
    )
  }

  if (!Array.isArray(a)) {
    throw new TypeError(
      `@asd14/m/intersectBy: expected 'a' to be 'Array', got '${type(a)}'`
    )
  }

  // @signature (fn, a) => (b)
  if (params.length === 2) {
    return (b: unknown) => _intersectBy(fn as EqualityFn<unknown>, a, b)
  }

  // @signature (fn, a, b)
  return _intersectBy(fn as EqualityFn<unknown>, a, params[2])
}) as IntersectByFn

export { intersectBy }
export type { IntersectByFn }
