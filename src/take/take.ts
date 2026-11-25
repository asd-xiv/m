import { type } from "../type/type.js"

type TakeFn = {
  // Uncurried: take `count` elements from the start
  <T>(count: number, input: readonly T[]): T[]

  // Curried: return a generic function that applies `count`.
  // T is deferred to the call site of the returned function because a bare
  // number argument carries no type information to infer T from.
  (count: number): <T>(input: readonly T[]) => T[]

  // Array-only shorthand: take 1 element from the start
  <T>(input: readonly T[]): T[]
}

const _take = (count: number, input: readonly unknown[]): unknown[] => {
  if (!Array.isArray(input)) {
    throw new TypeError(
      `@asd14/m/take: expected 'input' to be 'Array', got '${type(input)}'`
    )
  }

  return input.slice(0, count)
}

/**
 * Take elements from the start of an array. When called with only an array,
 * takes the first element (count defaults to 1).
 *
 * Input is never mutated - always returns a new array.
 *
 * @param {number} count - Number of elements, a non-negative integer
 * @param {Array} input - Source array
 *
 * @returns {Array} New array with the first `count` elements
 *
 * @example
 * take([1, 2, 3])
 * // => [1]
 *
 * take(2, [1, 2, 3])
 * // => [1, 2]
 *
 * take(2)([1, 2, 3])
 * // => [1, 2]
 *
 * pipe(take(2), map(read("id")))([{ id: 1 }, { id: 2 }, { id: 3 }])
 * // => [1, 2]
 *
 * @name take
 * @tag Array
 *
 * @see {@link first}
 * @see {@link takeLast}
 */
const take = ((...params: unknown[]) => {
  // @signature (input)
  if (Array.isArray(params[0])) {
    return _take(1, params[0] as readonly unknown[])
  }

  const count = params[0]

  if (typeof count !== "number") {
    throw new TypeError(
      `@asd14/m/take: expected 'count' to be 'Number', got '${type(count)}'`
    )
  }

  if (!Number.isInteger(count) || count < 0) {
    throw new TypeError(
      `@asd14/m/take: expected 'count' to be 'NonNegativeInteger', got '${String(count)}'`
    )
  }

  // @signature (count, input)
  if (params.length === 2) {
    return _take(count, params[1] as readonly unknown[])
  }

  // @signature (count) => (input)
  return (input: readonly unknown[]) => _take(count, input)
}) as TakeFn

export { take }
export type { TakeFn }
