/* eslint-disable jsdoc/check-param-names,jsdoc/require-param */

import { pipe } from "../pipe/pipe.js"
import { isMatch } from "../is-match/is-match.js"

const _find = (_fn, notFoundDefault, _input) => {
  const fn = Array.isArray(_fn) ? pipe(..._fn) : _fn
  const input = Array.isArray(_input) ? _input : [_input]

  for (let i = 0, length = input.length; i < length; i++) {
    const isFound = fn(input[i], i, input)

    if (isFound === true) {
      return input[i]
    }
  }

  return notFoundDefault
}

/**
 * Find the first element that matches a predicate
 *
 * @param {Function|Function[]} fn              Match function applied to each element
 * @param {any}                 notFoundDefault Return if no item found
 * @param {Array}               source          Source array to iterate over
 *
 * @returns {any}
 *
 * @name find
 * @tag Array
 * @signature (fn: Fn|Fn[], notFoundDefault: Any) => (source: Array): Any
 * @signature (fn: Fn|Fn[], notFoundDefault: Any, source: Array) => Any
 *
 * @see {@link findWith}
 *
 * @example
 * const comments = [{id: 1, body: ""}, {id: 2, body: "dolor"}]
 *
 * find(item => item.body === "dolor")(comments)
 * // => {id: 2, body: "dolor"}
 *
 * find([get("body"), equals("dolor")], null, comments)
 * // => {id: 2, boby: "dolor" }
 */
export const find = (...params) => {
  // @signature (fn, notFoundDefault) => (source)
  if (params.length <= 2) {
    return input => _find(params[0], params[1], input)
  }

  // @signature (fn, notFoundDefault, source)
  return _find(...params)
}

/**
 * Find the first element that matches an object
 *
 * @param {Object} subset          Match object
 * @param {any}    notFoundDefault Return if no item found
 * @param {Array}  source          Source array to iterate over
 *
 * @returns {any} First element found or undefined
 *
 * @name findWith
 * @tag Array
 * @signature (subset: Object, notFoundDefault: Any) => (source: Array): Any
 * @signature (subset: Object, notFoundDefault: Any, source: Array) => Any
 *
 * @see {@link find}
 * @see {@link isMatch}
 *
 * @example
 * const comments = [{id: 1, body: ""}, {id: 2, body: "dolor"}]
 *
 * findWith({id: 2})(comments)
 * // => {id: 2, body: "dolor"}
 *
 * find({id: "404"}, {default: "value"}, comments)
 * // => {default: "value"}
 */
export const findWith = (...params) => {
  // @signature (subset, notFoundDefault) => (source)
  if (params.length <= 2) {
    return input => _find(isMatch(params[0]), params[1], input)
  }

  // @signature (subset, notFoundDefault, source)
  return _find(isMatch(params[0]), params[1], params[2])
}
