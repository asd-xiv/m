import { type } from "../type/type.js"

type DropFn = {
  // Uncurried: drop `count` elements from the start
  <T>(count: number, input: readonly T[]): T[]

  // Curried: return a generic function that applies `count`.
  // T is deferred to the call site of the returned function because a bare
  // number argument carries no type information to infer T from.
  (count: number): <T>(input: readonly T[]) => T[]

  // Array-only shorthand: drop 1 element from the start
  <T>(input: readonly T[]): T[]
}

const _drop = (count: number, input: readonly unknown[]): unknown[] => {
  if (!Array.isArray(input)) {
    throw new TypeError(
      `@asd14/m/drop: expected 'input' to be 'Array', got '${type(input)}'`
    )
  }

  return count >= input.length ? [] : input.slice(count)
}

/**
 * Remove elements from the start of an array. When called with only an array,
 * removes the first element (count defaults to 1).
 *
 * Input is never mutated - always returns a new array.
 *
 * @param {number} count - Number of elements, a non-negative integer
 * @param {Array} input - Source array
 *
 * @returns {Array} New array with elements removed from the start
 *
 * @example
 * drop([1, 2, 3])
 * // => [2, 3]
 *
 * drop(2, [1, 2, 3])
 * // => [3]
 *
 * drop(2)([1, 2, 3])
 * // => [3]
 *
 * pipe(drop(1), map(read("id")))([{ id: 1 }, { id: 2 }, { id: 3 }])
 * // => [2, 3]
 *
 * @name drop
 * @tag Array
 *
 * @see {@link dropLast}
 * @see {@link take}
 */
const drop = ((...params: unknown[]) => {
  // @signature (input)
  if (Array.isArray(params[0])) {
    return _drop(1, params[0] as readonly unknown[])
  }

  const count = params[0]

  if (typeof count !== "number") {
    throw new TypeError(
      `@asd14/m/drop: expected 'count' to be 'Number', got '${type(count)}'`
    )
  }

  if (!Number.isInteger(count) || count < 0) {
    throw new TypeError(
      `@asd14/m/drop: expected 'count' to be 'NonNegativeInteger', got '${String(count)}'`
    )
  }

  // @signature (count, input)
  if (params.length === 2) {
    return _drop(count, params[1] as readonly unknown[])
  }

  // @signature (count) => (input)
  return (input: readonly unknown[]) => _drop(count, input)
}) as DropFn

export { drop }
export type { DropFn }
