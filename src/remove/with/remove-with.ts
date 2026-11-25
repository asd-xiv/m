import type { Matcher } from "../../../types/object.matcher.js"

import { type } from "../../type/type.js"
import { _buildMatch } from "../../utils/build-match.js"

type RemoveWithFn = {
  <T extends Record<string, unknown>>(
    match: Matcher<T>,
    input: readonly T[]
  ): T[]
  <T extends Record<string, unknown>>(
    match: Matcher<T>
  ): (input: readonly T[]) => T[]
}

const _removeWith = (
  predicate: (input: unknown) => boolean,
  input: unknown
): unknown[] => {
  if (!Array.isArray(input)) {
    throw new TypeError(
      `@asd14/m/removeWith: expected 'input' to be 'Array', got '${type(input)}'`
    )
  }

  const result: unknown[] = []

  for (let i = 0, length = input.length; i < length; i++) {
    if (!predicate(input[i])) {
      result.push(input[i])
    }
  }

  return result
}

/**
 * Remove the objects of an array that match a matcher. A matcher maps keys to
 * a value, a predicate or a predicate pipe. An object matches when every key
 * matches. A key prefixed with `!` negates its match. A value compares with
 * SameValueZero, as `Array.prototype.includes`, and a predicate passes only
 * when it returns `true`.
 *
 * Input is never mutated - always returns a new array.
 *
 * @param {Object} match - Map of keys to a value, predicate or predicate pipe
 * @param {Array} input - Array of objects
 *
 * @returns {Array} New array without the matching objects
 *
 * @example
 * removeWith({ author: null }, [
 *   { id: 1, author: null },
 *   { id: 2, author: "Joe" },
 * ])
 * // => [{ id: 2, author: "Joe" }]
 *
 * removeWith({ score: score => score > 5 })([
 *   { id: 1, score: 3 },
 *   { id: 2, score: 8 },
 * ])
 * // => [{ id: 1, score: 3 }]
 *
 * pipe(removeWith({ "!id": 2 }), map(read("id")))([{ id: 1 }, { id: 2 }])
 * // => [2]
 *
 * @name removeWith
 * @tag Array
 *
 * @see {@link remove}
 * @see {@link filterWith}
 */
const removeWith = ((...params: unknown[]) => {
  const predicate = _buildMatch(params[0], {
    fnName: "removeWith",
    inputName: "input[*]",
  })

  // @signature (match) => (input)
  if (params.length === 1) {
    return (input: unknown) => _removeWith(predicate, input)
  }

  // @signature (match, input)
  return _removeWith(predicate, params[1])
}) as RemoveWithFn

export { removeWith }
export type { RemoveWithFn }
