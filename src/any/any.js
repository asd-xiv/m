import { pipe } from "../pipe/pipe"
import { isMatch } from "../is-match/is-match"

const _any = (_fn, _source) => {
  const source = Array.isArray(_source) ? _source : [_source]
  const fn = Array.isArray(_fn) ? pipe(..._fn) : _fn

  for (let i = 0, length = source.length; i < length; i++) {
    if (fn(source[i]) === true) {
      return true
    }
  }

  return false
}

/**
 * Test if at least one element of array satisfies a function
 *
 * @param {Fn|Fn[]} fn     Test function called on each elements
 * @param {Array}   source Source array to iterate over
 *
 * @return {Boolean} True if at least one element passes, otherwise false
 *
 * @name any
 * @tag Array
 * @signature (fn: Function) => (source: Array): Boolean
 * @signature (fn: Function, source: Array): Boolean
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

export const anyWith = (...params) => {
  // @signature (subset) => (source)
  if (params.length <= 1) {
    return source => _any(isMatch(params[0]), source)
  }

  // @signature (subset, source)
  return _any(isMatch(params[0]), params[1])
}
