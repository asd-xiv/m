import { pipe } from "../pipe/pipe"
import { isMatch } from "../is-match/is-match"

const _findIndex = (_fn, source) => {
  const fn = Array.isArray(_fn) ? pipe(..._fn) : _fn

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
 * @param {Fn|Fn[]}  fn     Predicate applied to each element
 * @param {Object[]} source Source array to iterate over
 *
 * @return {Number} Position of found element or -1 if not found
 *
 * @name findIndex
 * @tag Array
 * @signature (fn: Function) => (source: Object[]): Number
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
export const findIndex = (...params) => {
  // @signature (fn) => (source)
  if (params.length <= 1) {
    return source => _findIndex(params[0], source)
  }

  // @signature (fn, source)
  return _findIndex(...params)
}

export const findIndexWith = (...params) => {
  // @signature (subset) => (source)
  if (params.length <= 1) {
    return source => _findIndex(isMatch(params[0]), source)
  }

  // @signature (subset, source)
  return _findIndex(isMatch(params[0]), params[1], params[2])
}
