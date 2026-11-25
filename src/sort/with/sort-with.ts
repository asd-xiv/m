import type { PlainObject } from "../../../types/object.js"

import { isPlainObject } from "../../is/is.js"
import { type } from "../../type/type.js"

import type { SortDirection } from "../sort.js"

type FieldSorter<T> =
  | SortDirection
  | ((a: T, b: T) => number)
  | ((value: T) => unknown)
  | [lens: (value: T) => unknown, direction: SortDirection]

type SortWithConfig<T extends PlainObject> = {
  [K in keyof T]?: FieldSorter<T[K]>
}

type AnySortWithConfig = Record<
  string,
  | SortDirection
  | ((a: never, b: never) => number)
  | ((value: never) => unknown)
  | [lens: (value: never) => unknown, direction: SortDirection]
>

type SortWithFn = {
  <T extends PlainObject>(config: SortWithConfig<T>, input: readonly T[]): T[]
  <C extends AnySortWithConfig>(
    config: C
  ): <U extends { [K in keyof C]?: unknown }>(input: readonly U[]) => U[]
}

const _compareTwoValues = (
  direction: SortDirection,
  a: unknown,
  b: unknown
): number => {
  const isANull = a === null
  const isBNull = b === null
  const isAMissing = isANull || a === undefined
  const isBMissing = isBNull || b === undefined

  // A missing field sorts last in both directions, `undefined` before `null`
  // in asc and after it in desc
  if (isAMissing || isBMissing) {
    if (!isBMissing) return 1
    if (!isAMissing) return -1
    if (isANull === isBNull) return 0

    return isANull === (direction === "desc") ? -1 : 1
  }

  const aValue = a as number
  const bValue = b as number
  const order = aValue < bValue ? -1 : aValue > bValue ? 1 : 0

  return direction === "desc" ? -order : order
}

const _validateParams = (subset: PlainObject): void => {
  const sorters = Object.entries(subset)

  for (const [key, sorter] of sorters) {
    const [sortFn, direction = "asc"] = Array.isArray(sorter)
      ? (sorter as [unknown, unknown])
      : typeof sorter === "function"
        ? [sorter as unknown]
        : [undefined, sorter as string]

    if (direction !== "asc" && direction !== "desc") {
      throw new TypeError(
        `@asd14/m/sortWith: expected '${key}' to be 'asc' or 'desc', got '${String(direction)}'`
      )
    }

    if (
      typeof sortFn === "function" &&
      (sortFn.length === 0 || sortFn.length > 2)
    ) {
      throw new TypeError(
        `@asd14/m/sortWith: expected '${key}' to be 'Unary' or 'Binary', got '${String(sortFn.length)}'`
      )
    }
  }
}

const _sortWith = (
  subset: PlainObject,
  input: readonly unknown[]
): unknown[] => {
  if (!Array.isArray(input)) {
    throw new TypeError(
      `@asd14/m/sortWith: expected 'input' to be 'Array', got '${type(input)}'`
    )
  }

  _validateParams(subset)

  const sorters = Object.entries(subset)

  return [...(input as readonly unknown[])].sort((a, b) => {
    const aRecord = a as PlainObject
    const bRecord = b as PlainObject

    for (let i = 0; i < sorters.length; ++i) {
      const [key, sorter] = sorters[i] as [string, unknown]
      const [sortFn, direction = "asc"] = Array.isArray(sorter)
        ? (sorter as [unknown, unknown])
        : typeof sorter === "function"
          ? [sorter as unknown]
          : [undefined, sorter as string]
      const isLastSorter = i === sorters.length - 1

      let result: number

      if (typeof sortFn === "function") {
        // one param, treat as lens: (source) => source.field
        // two params, treat as compare func: (a, b) => a - b
        result =
          sortFn.length === 2
            ? (sortFn as (a: unknown, b: unknown) => number)(
                aRecord[key],
                bRecord[key]
              )
            : _compareTwoValues(
                direction as SortDirection,
                (sortFn as (v: unknown) => unknown)(aRecord[key]),
                (sortFn as (v: unknown) => unknown)(bRecord[key])
              )
      } else {
        // { key: "direction" }
        result = _compareTwoValues(
          direction as SortDirection,
          aRecord[key],
          bRecord[key]
        )
      }

      if (result !== 0 || isLastSorter) {
        return result
      }
    }

    return 0
  })
}

/**
 * Sort an array of objects by multiple fields.
 *
 * Input is never mutated - always returns a new array. A missing field
 * (`undefined` or `null`) sorts last in both directions.
 *
 * Each field in the config can be:
 * - A direction string: "asc" or "desc"
 * - A compare function: (a, b) => number
 * - A lens function: (value) => comparable
 * - A tuple: [lensFn, direction]
 *
 * @param {Object} config - Per-field sort configuration
 * @param {Array}  input  - Array of objects to sort
 *
 * @returns {Array} New sorted array
 *
 * @example
 * sortWith({position: "asc"}, [
 *   { id: 1, position: 3 },
 *   { id: 2, position: 2 },
 * ])
 * // => [{ id: 2, position: 2 }, { id: 1, position: 3 }]
 *
 * sortWith({ name: "asc" })([{ name: "b" }, {}, { name: "a" }])
 * // => [{ name: "a" }, { name: "b" }, {}]
 *
 * const items = [
 *   { id: 5, createdAt: "2020-01-01" },
 *   { id: 6, createdAt: "2020-03-01" },
 *   { id: 4, createdAt: "2020-02-01" },
 * ]
 *
 * pipe(sortWith({ createdAt: "desc" }), map(read("id")))(items)
 * // => [6, 4, 5]
 *
 * @name sortWith
 * @tag Array
 *
 * @see {@link sort}
 * @see {@link sortBy}
 */
const sortWith = ((...params: unknown[]) => {
  if (!isPlainObject(params[0])) {
    throw new TypeError(
      `@asd14/m/sortWith: expected 'config' to be 'Object', got '${type(params[0])}'`
    )
  }

  // @signature (config) => (input)
  if (params.length === 1) {
    return (input: readonly unknown[]) =>
      _sortWith(params[0] as PlainObject, input)
  }

  // @signature (config, input)
  return _sortWith(params[0], params[1] as readonly unknown[])
}) as SortWithFn

export { sortWith }
export type { SortWithFn, SortWithConfig, FieldSorter }
