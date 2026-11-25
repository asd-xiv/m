import type { PlainObject } from "../../../types/object.js"
import type { Matcher } from "../../../types/object.matcher.js"

import { type } from "../../type/type.js"
import { _buildMatch } from "../../utils/build-match.js"
import { any } from "../any.js"

type AnyWithFn = {
  <T extends PlainObject>(match: Matcher<T>, input: readonly T[]): boolean
  <T extends PlainObject>(match: Matcher<T>): (input: readonly T[]) => boolean
}

const _anyWith = (
  predicate: (input: unknown) => boolean,
  input: unknown
): boolean => {
  if (!Array.isArray(input)) {
    throw new TypeError(
      `@asd14/m/anyWith: expected 'input' to be 'Array', got '${type(input)}'`
    )
  }

  return any(predicate, input)
}

/**
 * Test if any object of an array satisfies a matcher.
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
 * @returns {boolean} True if at least one object matches
 *
 * @example
 * anyWith({ role: "admin" }, [{ role: "user" }, { role: "admin" }])
 * // => true
 *
 * anyWith({ role: "admin" })([{ role: "user" }])
 * // => false
 *
 * anyWith({ "!role": "user" }, [{ role: "user" }, { role: "admin" }])
 * // => true
 *
 * pipe(
 *   filterWith({ active: true }),
 *   anyWith({ role: "admin" })
 * )([{ active: true, role: "admin" }, { active: false, role: "user" }])
 * // => true
 *
 * @name anyWith
 * @tag Array
 *
 * @see {@link any}
 * @see {@link allWith}
 * @see {@link countWith}
 */
const anyWith = ((...params: unknown[]) => {
  const predicate = _buildMatch(params[0], {
    fnName: "anyWith",
    inputName: "input[*]",
  })

  // @signature (match) => (input)
  if (params.length === 1) {
    return (input: unknown) => _anyWith(predicate, input)
  }

  // @signature (match, input)
  return _anyWith(predicate, params[1])
}) as AnyWithFn

export { anyWith, anyWith as hasWith }
export type { AnyWithFn }
