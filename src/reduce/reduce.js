import { pipe } from "../pipe/pipe"

const _reduce = (_fn, defaultAcc, _source) => {
  let acc = defaultAcc
  const source = Array.isArray(_source) ? _source : [_source]
  const fn = Array.isArray(_fn) ? pipe(..._fn) : _fn

  for (let i = 0, length = source.length; i < length; i++) {
    acc = fn(acc, source[i], i, source)
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
 * @param {...any}   params     Function params
 *
 * @returns {mixed}
 *
 * @name reduce
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
  // @signature (fn, defaultAcc) => (source)
  if (params.length <= 2) {
    return source => _reduce(params[0], params[1], source)
  }

  // @signature (fn, defaultAcc, source)
  return _reduce(...params)
}
