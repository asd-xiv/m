import { type } from "../../type/type.js"

type DropLastFn = {
  // Uncurried: drop `count` elements from the end
  <T>(count: number, input: readonly T[]): T[]

  // Curried: return a generic function that drops `count` elements.
  // T is deferred to the call site of the returned function because a bare
  // number argument carries no type information to infer T from.
  (count: number): <T>(input: readonly T[]) => T[]

  // Array-only shorthand: drop 1 element from the end
  <T>(input: readonly T[]): T[]
}

const _dropLast = (count: number, input: readonly unknown[]): unknown[] => {
  if (!Array.isArray(input)) {
    throw new TypeError(
      `@asd14/m/dropLast: expected 'input' to be 'Array', got '${type(input)}'`
    )
  }

  return count >= input.length ? [] : input.slice(0, input.length - count)
}

/**
 * Remove elements from the end of an array. When called with only an array,
 * removes the last element (count defaults to 1).
 *
 * Input is never mutated - always returns a new array.
 *
 * @param {number} count - Number of elements to remove, a non-negative integer
 * @param {Array} input - Source array
 *
 * @returns {Array} New array with elements removed from the end
 *
 * @example
 * dropLast([1, 2, 3])
 * // => [1, 2]
 *
 * dropLast(2, [1, 2, 3])
 * // => [1]
 *
 * dropLast(2)([1, 2, 3])
 * // => [1]
 *
 * pipe(dropLast(2), map(read("id")))([{ id: 1 }, { id: 2 }, { id: 3 }])
 * // => [1]
 *
 * @name dropLast
 * @tag Array
 *
 * @see {@link last}
 */
const dropLast = ((...params: unknown[]) => {
  // @signature (input)
  if (Array.isArray(params[0])) {
    return _dropLast(1, params[0] as readonly unknown[])
  }

  const count = params[0]

  if (typeof count !== "number") {
    throw new TypeError(
      `@asd14/m/dropLast: expected 'count' to be 'Number', got '${type(count)}'`
    )
  }

  if (!Number.isInteger(count) || count < 0) {
    throw new TypeError(
      `@asd14/m/dropLast: expected 'count' to be 'NonNegativeInteger', got '${String(count)}'`
    )
  }

  // @signature (count, input)
  if (params.length === 2) {
    return _dropLast(count, params[1] as readonly unknown[])
  }

  // @signature (count) => (input)
  return (input: readonly unknown[]) => _dropLast(count, input)
}) as DropLastFn

export { dropLast }
export type { DropLastFn }
