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
 * @param {Fn|Fn[]} fn     Test function called on each elements
 * @param {Array}   source Source array to iterate over
 *
 * @return {Boolean} True if all elements pass, otherwise false
 *
 * @name all
 * @tag Array
 * @signature (fn: Function) => (source: Array): Boolean
 * @signature (fn: Function, source: Array): Boolean
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

export const allWith = (...params) => {
  // @signature (subset) => (source)
  if (params.length <= 1) {
    return source => _all(isMatch(params[0]), source)
  }

  // @signature (subset, source)
  return _all(isMatch(params[0]), params[1])
}
