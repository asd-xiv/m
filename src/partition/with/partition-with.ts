import type { Matcher } from "../../../types/object.matcher.js"

import { type } from "../../type/type.js"
import { _buildMatch } from "../../utils/build-match.js"
import { partition } from "../partition.js"

type PartitionWithFn = {
  <T extends Record<string, unknown>>(
    match: Matcher<T>,
    input: readonly T[]
  ): [T[], T[]]
  <T extends Record<string, unknown>>(
    match: Matcher<T>
  ): (input: readonly T[]) => [T[], T[]]
}

const _partitionWith = (
  predicate: (input: unknown) => boolean,
  input: unknown
): [unknown[], unknown[]] => {
  if (!Array.isArray(input)) {
    throw new TypeError(
      `@asd14/m/partitionWith: expected 'input' to be 'Array', got '${type(input)}'`
    )
  }

  return partition(predicate, input)
}

/**
 * Split an array of objects into two groups with a matcher: the objects that satisfy it, then the rest.
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
 * @returns {[Array, Array]} Tuple of [pass, fail] arrays
 *
 * @example
 * partitionWith({ active: true }, [{ id: 1, active: true }, { id: 2, active: false }])
 * // => [[{ id: 1, active: true }], [{ id: 2, active: false }]]
 *
 * partitionWith({ role: "admin" })([{ role: "admin" }, { role: "user" }])
 * // => [[{ role: "admin" }], [{ role: "user" }]]
 *
 * partitionWith({ "!deletedAt": isSomething }, [{ id: 1 }, { id: 2, deletedAt: 1 }])
 * // => [[{ id: 1 }], [{ id: 2, deletedAt: 1 }]]
 *
 * pipe(
 *   partitionWith({ active: true }),
 *   ([active, inactive]) => active.length - inactive.length
 * )([{ active: true }, { active: false }, { active: true }])
 * // => 1
 *
 * @name partitionWith
 * @tag Array
 *
 * @see {@link partition}
 * @see {@link filterWith}
 */
const partitionWith = ((...params: unknown[]) => {
  const predicate = _buildMatch(params[0], {
    fnName: "partitionWith",
    inputName: "input[*]",
  })

  // @signature (match) => (input)
  if (params.length === 1) {
    return (input: unknown) => _partitionWith(predicate, input)
  }

  // @signature (match, input)
  return _partitionWith(predicate, params[1])
}) as PartitionWithFn

export { partitionWith }
export type { PartitionWithFn }
