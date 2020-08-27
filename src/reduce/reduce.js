import { pipe } from "../pipe/pipe"

const _reduce = (fn, defaultAcc, _source) => {
  let acc = defaultAcc
  const source = Array.isArray(_source) ? _source : [_source]

  for (let i = 0, length = source.length; i < length; i++) {
    acc = Array.isArray(fn)
      ? pipe(...fn)(acc, source[i], i, source)
      : fn(acc, source[i], i, source)
  }

  return acc
}

/**
 * Apply a function against an accumulator and each  element in the array (from
 * left to right) to reduce it to a single value.
 *
 * @param {Function} fn         Reduce function
 * @param {Object}   defaultAcc Default accumulator value
 * @param {Array}    source     Source input
 *
 * @return {mixed}
 *
 * @tag Array
 * @signature (fn: Function, defaultAcc: mixed) => (source: Array): mixed
 * @signature (fn: Function, defaultAcc: mixed, source: Array): mixed
 *
 * @example
 * const sum = (acc, item) => acc + item
 *
 * reduce(sum, 0, [1, 2])
 * // => 3
 */
export const reduce = (...params) => {
  /*
   * @signature (fn: Fn|Fn[], defaultAcc: mixed) => (source: []): mixed
   *
   * reduce(sum, 0)([1, 2])
   * // => 3
   */
  if (params.length < 3) {
    return source => _reduce(params[0], params[1], source)
  }

  /*
   * @signature (fn: Fn|Fn[], defaultAcc: mixed, source: []): mixed
   *
   * reduce(sum, 0, [1, 2])
   * // => 3
   */
  return _reduce(...params)
}
