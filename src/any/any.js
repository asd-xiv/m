import { pipe } from "../pipe/pipe"
import { isMatch } from "../is-match/is-match"

const _any = (_fn, _source) => {
  const source = Array.isArray(_source) ? _source : [_source]
  const fn = Array.isArray(_fn) ? pipe(..._fn) : _fn
  const shouldCompare = typeof fn !== "function"

  for (let i = 0, length = source.length; i < length; i++) {
    if (shouldCompare ? fn === source[i] : fn(source[i]) === true) {
      return true
    }
  }

  return false
}

/**
 * Test if at least one element in array matches predicate
 *
 * @param {Fn|Fn[]} fn     Predicate function
 * @param {Array}   source Source array to iterate over
 *
 * @return {Boolean} True if at least one element passes, otherwise false
 *
 * @name any
 * @alias has
 * @tag Array
 * @signature (fn: Function|Function[]) => (source: Array): Boolean
 * @signature (fn: Function|Function[], source: Array): Boolean
 *
 * @see {@link anyWith}
 * @see {@link all}
 * @see {@link allWith}
 *
 * @example
 * any(isNumber)([1, "string", NaN])
 * // => true
 *
 * any([get("id"), is], [{title: ""}, {}])
 * // => false
 */
export const any = (...params) => {
  // @signature (fn) => (source)
  if (params.length <= 1) {
    return source => _any(params[0], source)
  }

  // @signature (fn, source)
  return _any(...params)
}

/**
 * Test if at least one element in array matches object
 *
 * @param {Object} subset Match object
 * @param {Array}  source Source array to iterate over
 *
 * @return {Boolean} True if at least one element pass, otherwise false
 *
 * @name anyWith
 * @alias hasWith
 * @tag Array
 * @signature (subset: Object) => (source: Array): Boolean
 * @signature (subset: Object, source: Array): Boolean
 *
 * @see {@link any}
 * @see {@link all}
 * @see {@link allWith}
 * @see {@link isMatch}
 *
 * @example
 * anyWith({ comments: is })([{id: 1}, {id: 2, comments: []}])
 * // => true
 *
 * anyWith({ tags: is })([{id: 1}, {id: 2, comments: []}])
 * // => false
 */
export const anyWith = (...params) => {
  // @signature (subset) => (source)
  if (params.length <= 1) {
    return source => _any(isMatch(params[0]), source)
  }

  // @signature (subset, source)
  return _any(isMatch(params[0]), params[1])
}
