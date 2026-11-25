import { type } from "../../type/type.js"

type TakeLastFn = {
  // Uncurried: take `count` elements from the end
  <T>(count: number, input: readonly T[]): T[]

  // Curried: return a generic function that applies `count`.
  // T is deferred to the call site of the returned function because a bare
  // number argument carries no type information to infer T from.
  (count: number): <T>(input: readonly T[]) => T[]

  // Array-only shorthand: take 1 element from the end
  <T>(input: readonly T[]): T[]
}

const _takeLast = (count: number, input: readonly unknown[]): unknown[] => {
  if (!Array.isArray(input)) {
    throw new TypeError(
      `@asd14/m/takeLast: expected 'input' to be 'Array', got '${type(input)}'`
    )
  }

  return count === 0 ? [] : input.slice(-count)
}

/**
 * Take elements from the end of an array. When called with only an array,
 * takes the last element (count defaults to 1).
 *
 * Input is never mutated - always returns a new array.
 *
 * @param {number} count - Number of elements, a non-negative integer
 * @param {Array} input - Source array
 *
 * @returns {Array} New array with the last `count` elements
 *
 * @example
 * takeLast([1, 2, 3])
 * // => [3]
 *
 * takeLast(2, [1, 2, 3])
 * // => [2, 3]
 *
 * takeLast(2)([1, 2, 3])
 * // => [2, 3]
 *
 * pipe(takeLast(2), map(read("id")))([{ id: 1 }, { id: 2 }, { id: 3 }])
 * // => [2, 3]
 *
 * @name takeLast
 * @tag Array
 *
 * @see {@link last}
 * @see {@link take}
 */
const takeLast = ((...params: unknown[]) => {
  // @signature (input)
  if (Array.isArray(params[0])) {
    return _takeLast(1, params[0] as readonly unknown[])
  }

  const count = params[0]

  if (typeof count !== "number") {
    throw new TypeError(
      `@asd14/m/takeLast: expected 'count' to be 'Number', got '${type(count)}'`
    )
  }

  if (!Number.isInteger(count) || count < 0) {
    throw new TypeError(
      `@asd14/m/takeLast: expected 'count' to be 'NonNegativeInteger', got '${String(count)}'`
    )
  }

  // @signature (count, input)
  if (params.length === 2) {
    return _takeLast(count, params[1] as readonly unknown[])
  }

  // @signature (count) => (input)
  return (input: readonly unknown[]) => _takeLast(count, input)
}) as TakeLastFn

export { takeLast }
export type { TakeLastFn }
