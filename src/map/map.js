import { pipe } from "../pipe/pipe"

const _map = (_fn, _source) => {
  const result = []
  const source = Array.isArray(_source) ? _source : [_source]
  const fn = Array.isArray(_fn) ? pipe(..._fn) : _fn

  for (let i = 0, valuesCount = source.length; i < valuesCount; ++i) {
    result.push(fn(source[i], i, source))
  }

  return result
}

/**
 * Iterates over an array and applies a function on each element, returning a
 * new array with the transformed elements.
 *
 * @param {Fn|Fn[]} fn     Transform function called on each element
 * @param {Array}   source Source array to iterate over
 *
 * @return {Array} Returns new instance
 *
 * @name map
 * @tag Array
 * @signature (fn: Fn|Fn[]) => (source: Array) => Array
 * @signature (fn: Fn|Fn[], source: Array) => Array
 *
 * @see {@link mapMatrix}
 *
 * @example
 * const inc = x => x + 1
 *
 * map(inc, [1, 2])
 * // => [2, 3]
 *
 * map([inc, inc], [1, 2])
 * // => [3, 4]
 */
export const map = (...params) => {
  // @signature (fn) => (source)
  if (params.length <= 1) {
    return source => _map(params[0], source)
  }

  // @signature (fn, source)
  return _map(...params)
}
