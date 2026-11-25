import { type } from "../type/type.js"

type SortDirection = "asc" | "desc"

type Sortable = string | number | boolean

type SortFn = {
  <T extends Sortable>(input: readonly T[]): T[]
  <T extends Sortable>(direction: SortDirection, input: readonly T[]): T[]
  (direction: SortDirection): <T extends Sortable>(input: readonly T[]) => T[]
}

const _sort = (direction: string, input: readonly unknown[]): unknown[] => {
  if (!Array.isArray(input)) {
    throw new TypeError(
      `@asd14/m/sort: expected 'input' to be 'Array', got '${type(input)}'`
    )
  }

  return [...(input as readonly unknown[])].sort((a, b) => {
    const isANaN = Number.isNaN(a)
    const isBNaN = Number.isNaN(b)

    // NaN sorts last in both directions, as a missing field in sortWith
    if (isANaN || isBNaN) {
      return isANaN === isBNaN ? 0 : isANaN ? 1 : -1
    }

    const aValue = a as number
    const bValue = b as number
    const order = aValue < bValue ? -1 : aValue > bValue ? 1 : 0

    return direction === "asc" ? order : -order
  })
}

/**
 * Sort primitive array.
 *
 * Input is never mutated - always returns a new array. `NaN` sorts last in
 * both directions.
 *
 * @param {string|Array} [direction="asc"] - Sort direction, or the array to sort ascending when it is the only argument
 * @param {Array}  input - Array to sort
 *
 * @returns {Array} New sorted array
 *
 * @example
 * sort([3, 2, 1])
 * // => [1, 2, 3]
 *
 * sort("desc", [1, 2, 3])
 * // => [3, 2, 1]
 *
 * sort("desc")(["a", "c", "b"])
 * // => ["c", "b", "a"]
 *
 * sort([2, NaN, 1])
 * // => [1, 2, NaN]
 *
 * pipe(sort("desc"), first)([3, 1, 2])
 * // => 3
 *
 * @name sort
 * @tag Array
 *
 * @see {@link sortBy}
 * @see {@link sortWith}
 */
const sort = ((...params: unknown[]) => {
  // @signature (input)
  if (Array.isArray(params[0])) {
    return _sort("asc", params[0])
  }

  const direction = params[0]

  if (typeof direction !== "string") {
    throw new TypeError(
      `@asd14/m/sort: expected 'direction' to be 'Array' or 'String', got '${type(direction)}'`
    )
  }

  if (direction !== "asc" && direction !== "desc") {
    throw new TypeError(
      `@asd14/m/sort: expected 'direction' to be 'asc' or 'desc', got '${direction}'`
    )
  }

  // @signature (direction) => (input)
  if (params.length === 1) {
    return (input: readonly unknown[]) => _sort(direction, input)
  }

  // @signature (direction, input)
  return _sort(direction, params[1] as readonly unknown[])
}) as SortFn

export { sort }
export type { SortFn, SortDirection }
