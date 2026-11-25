import { type } from "../../type/type.js"

type CompareFn<T> = (a: T, b: T) => number

type SortByFn = {
  <T>(fn: CompareFn<T>, input: readonly T[]): T[]
  <T>(fn: CompareFn<T>): <U extends T>(input: readonly U[]) => U[]
}

const _sortBy = (
  fn: CompareFn<unknown>,
  input: readonly unknown[]
): unknown[] => {
  if (!Array.isArray(input)) {
    throw new TypeError(
      `@asd14/m/sortBy: expected 'input' to be 'Array', got '${type(input)}'`
    )
  }

  return [...(input as readonly unknown[])].sort(fn)
}

/**
 * Sort array using custom compare function.
 *
 * Input is never mutated - always returns a new array.
 *
 * @param {Function} fn    - Compare function (a, b) => number
 * @param {Array}    input - Array to sort
 *
 * @returns {Array} New sorted array
 *
 * @example
 * sortBy((a, b) => a.id - b.id, [{id: 2}, {id: 1}])
 * // => [{id: 1}, {id: 2}]
 *
 * pipe(
 *   sortBy((a, b) => a.weight - b.weight),
 *   map(read("name"))
 * )(users)
 * // => ["bob", "carol", "alice"]
 *
 * @name sortBy
 * @tag Array
 *
 * @see {@link sort}
 * @see {@link sortWith}
 */
const sortBy = ((...params: unknown[]) => {
  if (typeof params[0] !== "function") {
    throw new TypeError(
      `@asd14/m/sortBy: expected 'fn' to be 'Function', got '${type(params[0])}'`
    )
  }

  // @signature (fn) => (input)
  if (params.length === 1) {
    return (input: readonly unknown[]) =>
      _sortBy(params[0] as CompareFn<unknown>, input)
  }

  // @signature (fn, input)
  return _sortBy(
    params[0] as CompareFn<unknown>,
    params[1] as readonly unknown[]
  )
}) as SortByFn

export { sortBy }
export type { SortByFn, CompareFn }
