import { all } from "../all/all.js"
import { isMatch } from "../is-match/is-match.js"

/**
 * Test if all elements in array match object
 *
 * @template T
 * @param {Matcher<T>} match
 * @param {T[]} input
 * @returns {boolean}        True if all elements match, otherwise false
 *
 * @name allWith
 * @tag Array
 * @signature <T>(match: Matcher<T>, input: T[]): boolean
 *
 * @see {@link all}
 * @see {@link any}
 * @see {@link anyWith}
 * @see {@link isMatch}
 *
 * @example
 * allWith(isNumber)([1, 2, 3])
 * // => true
 *
 * allWith(is, [1, "asd", null])
 * // => false
 */
export const allWith = (...params) => {
  if (params.length <= 1) {
    return input => allWith(params[0], input)
  }

  return all(isMatch(params[0]), params[1])
}
