import { pipe } from "../pipe/pipe"

const _repeat = (_fn, count = 0) => {
  const result = []
  const fn = Array.isArray(_fn) ? pipe(..._fn) : _fn
  const isFunction = typeof fn === "function"

  for (let i = 0; i < count; i++) {
    result.push(isFunction ? fn(i) : fn)
  }

  return result
}

/**
 * Return an array of fixed size containing a specified value or function result
 *
 * @param {Function|mixed} fn     Function or value to repeat
 * @param {Number}         source Number of times
 *
 * @return {Array}
 *
 * @name repeat
 * @tag Array
 * @signature (fn: Function|mixed) => (count: Number): Array
 *
 * @example
 * repeat(2)(3)
 * // => [2, 2, 2]
 *
 * repeat(index => index + 1, 3)
 * // => [1, 2, 3]
 */
export const repeat = (...params) => {
  // @signature (fn) => (source)
  if (params.length <= 1) {
    return source => _repeat(params[0], source)
  }

  // @signature (fn, source)
  return _repeat(...params)
}
