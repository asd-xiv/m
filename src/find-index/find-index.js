import { pipe } from "../pipe/pipe"
import { curry } from "../curry/curry"
import { isMatch } from "../is-match/is-match"

const _findIndex = (_fn, _source) => {
  const fn = Array.isArray(_fn) ? pipe(..._fn) : _fn
  const source = Array.isArray(_source) ? _source : [_source]

  for (let i = 0, length = source.length; i < length; i++) {
    const found = fn(source[i], i, source)

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

export const findIndexWith = curry((subset, source) =>
  _findIndex(isMatch(subset), source)
)
