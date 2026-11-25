import type { Matcher } from "../../../../types/object.matcher.js"

import { type } from "../../../type/type.js"
import { _buildMatch } from "../../../utils/build-match.js"
import { findIndex } from "../find-index.js"

type FindIndexWithFn = {
  <T extends Record<string, unknown>>(
    match: Matcher<T>,
    input: readonly T[]
  ): number
  <T extends Record<string, unknown>>(
    match: Matcher<T>
  ): (input: readonly T[]) => number
}

const _findIndexWith = (
  predicate: (input: unknown) => boolean,
  input: unknown
): number => {
  if (!Array.isArray(input)) {
    throw new TypeError(
      `@asd14/m/findIndexWith: expected 'input' to be 'Array', got '${type(input)}'`
    )
  }

  return findIndex(predicate, input)
}

/**
 * Find the index of the first object of an array that satisfies a matcher.
 * Returns -1 if no object matches.
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
 * @returns {number} Index of the first matching object, or -1
 *
 * @example
 * findIndexWith({ id: 2 }, [{ id: 1 }, { id: 2 }])
 * // => 1
 *
 * findIndexWith({ role: "admin" })([{ role: "user" }, { role: "admin" }])
 * // => 1
 *
 * findIndexWith({ id: 99 }, [{ id: 1 }])
 * // => -1
 *
 * pipe(
 *   filterWith({ active: true }),
 *   findIndexWith({ id: 3 })
 * )([{ id: 1, active: true }, { id: 2, active: false }, { id: 3, active: true }])
 * // => 1
 *
 * @name findIndexWith
 * @tag Array
 *
 * @see {@link findIndex}
 * @see {@link findWith}
 * @see {@link filterWith}
 */
const findIndexWith = ((...params: unknown[]) => {
  const predicate = _buildMatch(params[0], {
    fnName: "findIndexWith",
    inputName: "input[*]",
  })

  // @signature (match) => (input)
  if (params.length === 1) {
    return (input: unknown) => _findIndexWith(predicate, input)
  }

  // @signature (match, input)
  return _findIndexWith(predicate, params[1])
}) as FindIndexWithFn

export { findIndexWith }
export type { FindIndexWithFn }
