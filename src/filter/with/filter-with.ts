import type { Matcher } from "../../../types/object.matcher.js"

import { type } from "../../type/type.js"
import { _buildMatch } from "../../utils/build-match.js"
import { filter } from "../filter.js"

type FilterWithFn = {
  <T extends Record<string, unknown>>(
    match: Matcher<T>,
    input: readonly T[]
  ): T[]
  <T extends Record<string, unknown>>(
    match: Matcher<T>
  ): (input: readonly T[]) => T[]
}

const _filterWith = (
  predicate: (input: unknown) => boolean,
  input: unknown
): unknown[] => {
  if (!Array.isArray(input)) {
    throw new TypeError(
      `@asd14/m/filterWith: expected 'input' to be 'Array', got '${type(input)}'`
    )
  }

  return filter(predicate, input)
}

/**
 * Filter the objects of an array that satisfy a matcher.
 *
 * A matcher key takes a value, compared with SameValueZero, a predicate, or a
 * pipe chain ending in a predicate. A `!` before a key negates its test. Only
 * own keys count. A matcher value is never an array, since an array is a pipe.
 * Match an array with a predicate.
 *
 * Input is never mutated.
 *
 * @param {Object} match - Key matchers
 * @param {Array} input - Array of objects
 *
 * @returns {Array} New array of the matching objects
 *
 * @example
 * filterWith({ role: "admin" }, [{ role: "admin" }, { role: "user" }])
 * // => [{ role: "admin" }]
 *
 * filterWith({ "!deletedAt": isSomething })([{ id: 1 }, { id: 2, deletedAt: 1 }])
 * // => [{ id: 1 }]
 *
 * filterWith({ age: [x => x + 1, x => x > 18] }, [{ age: 17 }, { age: 30 }])
 * // => [{ age: 30 }]
 *
 * pipe(
 *   filterWith({ active: true }),
 *   map(read("id"))
 * )([{ id: 1, active: true }, { id: 2, active: false }])
 * // => [1]
 *
 * @name filterWith
 * @tag Array
 *
 * @see {@link filter}
 * @see {@link findWith}
 * @see {@link partitionWith}
 */
const filterWith = ((...params: unknown[]) => {
  const predicate = _buildMatch(params[0], {
    fnName: "filterWith",
    inputName: "input[*]",
  })

  // @signature (match) => (input)
  if (params.length === 1) {
    return (input: unknown) => _filterWith(predicate, input)
  }

  // @signature (match, input)
  return _filterWith(predicate, params[1])
}) as FilterWithFn

export { filterWith }
export type { FilterWithFn }
