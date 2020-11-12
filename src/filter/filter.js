import { pipe } from "../pipe/pipe"
import { curry } from "../curry/curry"
import { isMatch } from "../is-match/is-match"

const _filter = (_fn, _source) => {
  const fn = Array.isArray(_fn) ? pipe(..._fn) : _fn
  const source = Array.isArray(_source) ? _source : [_source]
  const result = []

  for (let i = 0, length = source.length; i < length; i++) {
    if (fn.call(null, source[i]) === true) {
      result.push(source[i])
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
 * @param {object} subset The function
 *
 * @returns {Array}
 *
 * @name filterWith
 * @tag Array
 * @signature (subset: Object) => (source: Array): Array
 * @signature (subset: Object, source: Array): Array
 */
export const filterWith = curry((subset, source) =>
  _filter(isMatch(subset), source)
)
