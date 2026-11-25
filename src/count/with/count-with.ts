import type { Matcher } from "../../../types/object.matcher.js"

import { type } from "../../type/type.js"
import { _buildMatch } from "../../utils/build-match.js"
import { countBy } from "../by/count-by.js"

type CountWithFn = {
  <T extends Record<string, unknown>>(
    match: Matcher<T>,
    input: readonly T[]
  ): number
  <T extends Record<string, unknown>>(
    match: Matcher<T>
  ): (input: readonly T[]) => number
}

const _countWith = (
  predicate: (input: unknown) => boolean,
  input: unknown
): number => {
  if (!Array.isArray(input)) {
    throw new TypeError(
      `@asd14/m/countWith: expected 'input' to be 'Array', got '${type(input)}'`
    )
  }

  return countBy(predicate, input)
}

/**
 * Count the objects of an array that satisfy a matcher.
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
 * @returns {number} Number of matching objects
 *
 * @example
 * countWith({ role: "admin" }, [{ role: "admin" }, { role: "user" }])
 * // => 1
 *
 * countWith({ "!deletedAt": isSomething })([{ id: 1 }, { id: 2, deletedAt: 1 }])
 * // => 1
 *
 * countWith({ score: [x => x * 2, x => x > 10] }, [{ score: 3 }, { score: 6 }])
 * // => 1
 *
 * pipe(
 *   filterWith({ team: "a" }),
 *   countWith({ active: true })
 * )([{ team: "a", active: true }, { team: "b", active: true }])
 * // => 1
 *
 * @name countWith
 * @tag Array
 *
 * @see {@link countBy}
 * @see {@link count}
 * @see {@link filterWith}
 */
const countWith = ((...params: unknown[]) => {
  const predicate = _buildMatch(params[0], {
    fnName: "countWith",
    inputName: "input[*]",
  })

  // @signature (match) => (input)
  if (params.length === 1) {
    return (input: unknown) => _countWith(predicate, input)
  }

  // @signature (match, input)
  return _countWith(predicate, params[1])
}) as CountWithFn

export { countWith }
export type { CountWithFn }
