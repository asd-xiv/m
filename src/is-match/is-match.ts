import type { Matcher } from "../../types/object.matcher.js"

import { _buildMatch } from "../utils/build-match.js"

type IsMatchFn = {
  // Uncurried: T inferred from input, matcher validated against it
  <T extends Record<string, unknown>>(match: Matcher<T>, input: T): boolean

  // Curried: T inferred from matcher, returned fn accepts any record.
  // The returned predicate is intentionally loose (Record<string, unknown>)
  // because the matcher may contain negation keys ("!key") whose runtime
  // semantics cannot be captured at the type level.
  <T extends Record<string, unknown>>(
    match: Matcher<T>
  ): (input: Record<string, unknown>) => boolean
}

/**
 * Determines if one object's properties are equal to another. Compares a
 * value with SameValueZero, as `Array.prototype.includes`: `NaN` equals `NaN`.
 * A function passes only when it returns `true`. An array in a matcher slot is
 * a pipe of functions, never a value: match an array with a predicate. Reads
 * only the own keys of the input.
 *
 * @param {Object} match - Subset of properties to test against
 * @param {Object} input - Object to test
 *
 * @returns {boolean} True if all matcher properties match the input
 *
 * @example
 * isMatch({ id: 2, parentId: null }, { id: 2, parentId: null, name: "John" })
 * // => true
 *
 * isMatch({
 *  id: 2,
 *  parentId: null,
 * })({
 *  id: 2,
 *  parentId: null,
 *  name: "John",
 * })
 * // => true
 *
 * isMatch({
 *  "!parentId": null,
 *  "name": "John",
 * })({
 *  id: 2,
 *  parentId: null,
 *  name: "John",
 * })
 * // => false
 *
 * isMatch({ "!tagId": isSomething })({ id: 2 })
 * // => true
 *
 * isMatch({ tags: tags => tags.length === 1 })({ tags: ["a"] })
 * // => true
 *
 * pipe(
 *   filter(isMatch({ role: "admin" })),
 *   map(pick(["id", "name"]))
 * )(users)
 * // => [{ id: 1, name: "Alice" }]
 *
 * @name isMatch
 * @tag Object
 *
 * @see {@link allWith}
 * @see {@link anyWith}
 * @see {@link filterWith}
 * @see {@link findWith}
 */
const isMatch = ((...params: unknown[]) => {
  const predicate = _buildMatch(params[0], {
    fnName: "isMatch",
    inputName: "input",
  })

  // @signature (match) => (input)
  if (params.length === 1) {
    return predicate
  }

  // @signature (match, input)
  return predicate(params[1])
}) as IsMatchFn

export { isMatch }
export type { IsMatchFn, Matcher }
