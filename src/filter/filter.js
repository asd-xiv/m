import { pipe } from "../pipe/pipe.js"
import { curry } from "../curry/curry.js"
import { isMatch } from "../is-match/is-match.js"

const _filter = (_fn, _input) => {
  const fn = Array.isArray(_fn) ? pipe(..._fn) : _fn
  const input = Array.isArray(_input) ? _input : [_input]
  const result = []

  for (let i = 0, length = input.length; i < length; i++) {
    if (fn(input[i]) === true) {
      result.push(input[i])
    }
  }

  return result
}

/**
 * Filter elements matching a predicate
 *
 * @param {Function} fn Predicate functions
 *
 * @returns {Array}
 *
 * @name filter
 * @tag Array
 * @signature (fn: Function) => (source: Array): Array
 * @signature (fn: Function, source: Array): Array
 */
export const filter = curry(_filter)

/**
 * Filter elements matching an object
 *
 * @param {Object} subset The function
 *
 * @returns {Array}
 *
 * @name filterWith
 * @tag Array
 * @signature (subset: Object) => (source: Array): Array
 * @signature (subset: Object, source: Array): Array
 */
export const filterWith = curry((subset, input) =>
  _filter(isMatch(subset), input)
)
