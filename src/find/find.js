import { pipe } from "../pipe/pipe"
import { isMatch } from "../is-match/is-match"

const _find = (_fn, notFoundDefault, source) => {
  const fn = Array.isArray(_fn) ? pipe(..._fn) : _fn

  for (let i = 0, length = source.length; i < length; i++) {
    const isFound = fn(source[i], i, source)

    if (isFound === true) {
      return source[i]
    }
  }

  return notFoundDefault
}

/**
 * Find the first element that satisfies a predicate function
 *
 * @param {Fn|Fn[]} fn              Predicate applied to each element
 * @param {Any}     notFoundDefault Return if no item found
 * @param {Array}   source          Source array to iterate over
 *
 * @return {Any|undefined} First element found or undefined
 *
 * @name find
 * @tag Array
 * @signature (fn: Fn|Fn[], notFoundDefault: Any) => (source: Array): Any
 * @signature (fn: Fn|Fn[], notFoundDefault: Any, source: Array) => Any
 *
 * @example
 * const comments = [{id: 1, body: ""}, {id: 2, body: "dolor"}]
 *
 * find(item => item.body === "dolor")(comments)
 * // => {id: 2, body: "dolor"}
 *
 * find([get("body"), equals("dolor")], null, comments)
 * // => {id: 2, boby: "dolor" }
 *
 */
export const find = (...params) => {
  // @signature (fn, notFoundDefault) => (source)
  if (params.length <= 2) {
    return source => _find(params[0], params[1], source)
  }

  // @signature (fn, notFoundDefault, source)
  return _find(...params)
}

export const findWith = (...params) => {
  // @signature (subset, notFoundDefault) => (source)
  if (params.length <= 2) {
    return source => _find(isMatch(params[0]), params[1], source)
  }

  // @signature (subset, notFoundDefault, source)
  return _find(isMatch(params[0]), params[1], params[2])
}
