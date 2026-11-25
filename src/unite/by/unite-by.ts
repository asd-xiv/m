import type { EqualityFn } from "../../distinct/by/distinct-by.js"

import { distinctBy } from "../../distinct/by/distinct-by.js"
import { type } from "../../type/type.js"

type UniteByFn = {
  <T>(fn: EqualityFn<T>, a: readonly T[], b: readonly T[]): T[]
  <T>(fn: EqualityFn<T>, a: readonly T[]): (b: readonly T[]) => T[]
}

const _uniteBy = (
  fn: EqualityFn<unknown>,
  a: readonly unknown[],
  b: unknown
): unknown[] => {
  if (!Array.isArray(b)) {
    throw new TypeError(
      `@asd14/m/uniteBy: expected 'b' to be 'Array', got '${type(b)}'`
    )
  }

  const items: unknown[] = [...a, ...(b as readonly unknown[])]

  return distinctBy(fn, items)
}

/**
 * Set union of two arrays, with your own equality function. Returns a new
 * array of the items of both arrays, where the first of each group of equal
 * items wins. Order is preserved - items from the first array appear first.
 *
 * Input is never mutated - always returns a new array.
 *
 * @param {Function} fn - `(newItem, keptItem) => boolean`, true when equal
 * @param {Array} a - First array
 * @param {Array} [b] - Second array
 *
 * @returns {Array} New array of unique items from both arrays
 *
 * @example
 * const byId = (a, b) => a.id === b.id
 *
 * uniteBy(byId, [{ id: 1, v: "a" }], [{ id: 1, v: "b" }, { id: 2, v: "c" }])
 * // => [{ id: 1, v: "a" }, { id: 2, v: "c" }]
 *
 * uniteBy(byId, [{ id: 1, v: "a" }])([{ id: 1, v: "b" }, { id: 2, v: "c" }])
 * // => [{ id: 1, v: "a" }, { id: 2, v: "c" }]
 *
 * // In a pipe - add the fetched users to the known ones
 * pipe(
 *   read("users"),
 *   uniteBy(byId, [{ id: 1, v: "a" }])
 * )({ users: [{ id: 1, v: "b" }, { id: 2, v: "c" }] })
 * // => [{ id: 1, v: "a" }, { id: 2, v: "c" }]
 *
 * @name uniteBy
 * @tag Array
 *
 * @see {@link unite}
 * @see {@link distinctBy}
 */
const uniteBy = ((...params: unknown[]) => {
  const fn = params[0]
  const a = params[1]

  if (typeof fn !== "function") {
    throw new TypeError(
      `@asd14/m/uniteBy: expected 'fn' to be 'Function', got '${type(fn)}'`
    )
  }

  if (!Array.isArray(a)) {
    throw new TypeError(
      `@asd14/m/uniteBy: expected 'a' to be 'Array', got '${type(a)}'`
    )
  }

  // @signature (fn, a) => (b)
  if (params.length === 2) {
    return (b: unknown) => _uniteBy(fn as EqualityFn<unknown>, a, b)
  }

  // @signature (fn, a, b)
  return _uniteBy(fn as EqualityFn<unknown>, a, params[2])
}) as UniteByFn

export { uniteBy }
export type { UniteByFn }
