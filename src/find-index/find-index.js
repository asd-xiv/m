import { pipe } from "../pipe/pipe.js"
import { curry } from "../curry/curry.js"
import { isMatch } from "../is-match/is-match.js"

const _findIndex = (_fn, _input) => {
  const fn = Array.isArray(_fn) ? pipe(..._fn) : _fn
  const input = Array.isArray(_input) ? _input : [_input]

  for (let i = 0, length = input.length; i < length; i++) {
    const found = fn(input[i], i, input)

    if (found === true) {
      return i
    }
  }

  return -1
}

/**
 * Find the position the first element that satisfies a predicate function
 *
 * @param {Function|Function[]} fn     Predicate applied to each element
 * @param {Object[]}            source Source array to iterate over
 *
 * @returns {number} Position of found element or -1 if not found
 *
 * @name findIndex
 * @tag Array
 * @signature (fn: Function, source: Object[]): Number
 *
 * @example
 * const comments = [{id: 1, body: ""}, {id: 2, body: "dolor"}]
 *
 * findIndex(item => item.body === "lorem")(comments)
 * // => -1
 *
 * findIndex([get("body"), equals("dolor")], null, comments)
 * // => 1
 */
export const findIndex = curry(_findIndex)

export const findIndexWith = curry((subset, input) =>
  _findIndex(isMatch(subset), input)
)
