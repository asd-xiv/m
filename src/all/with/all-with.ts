import type { PlainObject } from "../../../types/object.js"
import type { Matcher } from "../../../types/object.matcher.js"
import { type } from "../../type/type.js"
import { _buildMatch } from "../../utils/build-match.js"
import { all } from "../all.js"

type AllWithFn = {
  <T extends PlainObject>(match: Matcher<T>, input: readonly T[]): boolean
  <T extends PlainObject>(match: Matcher<T>): (input: readonly T[]) => boolean
}

const _allWith = (
  predicate: (input: unknown) => boolean,
  input: unknown
): boolean => {
  if (!Array.isArray(input)) {
    throw new TypeError(
      `@asd14/m/allWith: expected 'input' to be 'Array', got '${type(input)}'`
    )
  }

  return all(predicate, input)
}

/**
 * Test if all objects of an array satisfy a matcher.
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
 * @returns {boolean} True if every object matches
 *
 * @example
 * allWith({ active: true }, [{ active: true }, { active: true }])
 * // => true
 *
 * allWith({ active: true })([{ active: true }, { active: false }])
 * // => false
 *
 * allWith({ "!role": "banned" }, [{ role: "user" }, { role: "admin" }])
 * // => true
 *
 * pipe(
 *   filterWith({ team: "a" }),
 *   allWith({ active: true })
 * )([{ team: "a", active: true }, { team: "b", active: false }])
 * // => true
 *
 * @name allWith
 * @tag Array
 *
 * @see {@link all}
 * @see {@link anyWith}
 * @see {@link countWith}
 */
const allWith = ((...params: unknown[]) => {
  const predicate = _buildMatch(params[0], {
    fnName: "allWith",
    inputName: "input[*]",
  })

  // @signature (match) => (input)
  if (params.length === 1) {
    return (input: unknown) => _allWith(predicate, input)
  }

  // @signature (match, input)
  return _allWith(predicate, params[1])
}) as AllWithFn

export { allWith }
export type { AllWithFn }
