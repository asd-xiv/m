import { pipe } from "../pipe/pipe"

const _map = (fn, _source) => {
  const result = []
  const source = Array.isArray(_source) ? _source : [_source]

  for (let i = 0, valuesCount = source.length; i < valuesCount; ++i) {
    result.push(
      Array.isArray(fn)
        ? pipe(...fn)(source[i], i, source)
        : fn(source[i], i, source)
    )
  }

  return result
}

/**
 * Iterates over an array and applies a function on each element, returning a
 * new array with the transformed elements.
 *
 * @param  {Fn|Fn[]} fn     Transform function called on all elements
 * @param  {[]}      source Array to iterate over
 *
 * @return {Array} Returns new instance
 *
 * @tag Array
 * @signature (fn: Fn|Fn[]) => (source: []) => []
 * @signature (fn: Fn|Fn[], source: []) => []
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
  /*
   * @signature (fn: Fn|Fn[]) => (source: []): []
   *
   * map(inc)([1, 2])
   * // => [2, 3]
   */
  if (params.length === 1) {
    return source => _map(params[0], source)
  }

  /*
   * @signature (fn: Fn|Fn[], source: []): []
   *
   * map(inc, [1, 2])
   * // => [2, 3]
   */
  return _map(...params)
}
