import { pipe } from "../pipe/pipe"
import { isMatch } from "../is-match/is-match"

const _all = (_fn, _source) => {
  const source = Array.isArray(_source) ? _source : [_source]
  const fn = Array.isArray(_fn) ? pipe(..._fn) : _fn

  for (let i = 0, length = source.length; i < length; i++) {
    if (fn(source[i]) !== true) {
      return false
    }
  }

  return true
}

/**
 * Test if all elements of array satisfy a function
 *
 * @param {Function|Function[]} fn     Test function called on each elements
 * @param {Array}               source Source array to iterate over
 *
 * @return {Boolean} True if all elements pass, otherwise false
 *
 * @name all
 * @tag Array
 * @signature (fn: Function|Function[]) => (source: Array): Boolean
 * @signature (fn: Function|Function[], source: Array): Boolean
 *
 * @see {@link allWith}
 * @see {@link any}
 * @see {@link anyWith}
 *
 * @example
 * all(isNumber)([1, 2, 3])
 * // => true
 *
 * all(is, [1, "asd", null])
 * // => false
 */
export const all = (...params) => {
  // @signature (fn) => (source)
  if (params.length <= 1) {
    return source => _all(params[0], source)
  }

  // @signature (fn, source)
  return _all(...params)
}

/**
 * Test if all elements in array match object
 *
 * @param {Object} subset Match object
 * @param {Array}  source Source array to iterate over
 *
 * @return {Boolean} True if all elements match, otherwise false
 *
 * @name allWith
 * @tag Array
 * @signature (subset: Object) => (source: Array): Boolean
 * @signature (subset: Object, source: Array): Boolean
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
  // @signature (subset) => (source)
  if (params.length <= 1) {
    return source => _all(isMatch(params[0]), source)
  }

  // @signature (subset, source)
  return _all(isMatch(params[0]), params[1])
}
