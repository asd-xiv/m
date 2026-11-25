import type { Matcher } from "../../../types/object.matcher.js"

import { type } from "../../type/type.js"
import { _buildMatch } from "../../utils/build-match.js"
import { find } from "../find.js"

type FindWithFn = {
  <T extends Record<string, unknown>>(
    match: Matcher<T>,
    input: readonly T[]
  ): T | undefined
  <T extends Record<string, unknown>>(
    match: Matcher<T>
  ): (input: readonly T[]) => T | undefined
}

const _findWith = (
  predicate: (input: unknown) => boolean,
  input: unknown
): unknown => {
  if (!Array.isArray(input)) {
    throw new TypeError(
      `@asd14/m/findWith: expected 'input' to be 'Array', got '${type(input)}'`
    )
  }

  return find(predicate, input)
}

/**
 * Find the first object of an array that satisfies a matcher.
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
 * @returns {Object|undefined} First matching object, or undefined
 *
 * @example
 * findWith({ id: 2 }, [{ id: 1 }, { id: 2, name: "b" }])
 * // => { id: 2, name: "b" }
 *
 * findWith({ role: "admin" })([{ role: "user" }, { role: "admin" }])
 * // => { role: "admin" }
 *
 * findWith({ id: 99 }, [{ id: 1 }])
 * // => undefined
 *
 * pipe(
 *   findWith({ id: 2 }),
 *   read("name")
 * )([{ id: 1, name: "a" }, { id: 2, name: "b" }])
 * // => "b"
 *
 * @name findWith
 * @tag Array
 *
 * @see {@link find}
 * @see {@link findIndex}
 * @see {@link findIndexWith}
 * @see {@link filterWith}
 */
const findWith = ((...params: unknown[]) => {
  const predicate = _buildMatch(params[0], {
    fnName: "findWith",
    inputName: "input[*]",
  })

  // @signature (match) => (input)
  if (params.length === 1) {
    return (input: unknown) => _findWith(predicate, input)
  }

  // @signature (match, input)
  return _findWith(predicate, params[1])
}) as FindWithFn

export { findWith }
export type { FindWithFn }
