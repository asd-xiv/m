import { pipe } from "../pipe/pipe.js"

const _repeat = (_fn, count = 0) => {
  const result = []
  const fn = Array.isArray(_fn) ? pipe(..._fn) : _fn
  const isFunction = typeof fn === "function"

  for (let i = 0; i < count; i++) {
    result.push(isFunction ? fn(i, result) : fn)
  }

  return result
}

/**
 * Return an array of fixed size containing a specified value or function result
 *
 * @param {Function|any} fn     Function or value to repeat
 * @param {number}       input  Number of times
 * @param {...any}       params Function params
 *
 * @returns {Array}
 *
 * @name repeat
 * @tag Array
 * @signature (fn: Function|any) => (count: Number): Array
 *
 * @example
 * repeat(2)(3)
 * // => [2, 2, 2]
 *
 * repeat(index => index + 1, 3)
 * // => [1, 2, 3]
 */
export const repeat = (...params) => {
  // @signature (fn) => (input)
  if (params.length <= 1) {
    return input => _repeat(params[0], input)
  }

  // @signature (fn, input)
  return _repeat(...params)
}
