import { pipe } from "../pipe/pipe.js"

const _reduce = (_fn, defaultAcc, _input) => {
  let acc = defaultAcc
  const input = Array.isArray(_input) ? _input : [_input]
  const fn = Array.isArray(_fn) ? pipe(..._fn) : _fn

  for (let index = 0, length = input.length; index < length; index++) {
    acc = fn(acc, input[index], index, input)
  }

  return acc
}

/**
 * Apply a function against an accumulator and each  element in the array (from
 * left to right) to reduce it to a single value.
 *
 * @param {Function} fn         Reduce function
 * @param {Object}   defaultAcc Default accumulator value
 * @param {Array}    input      Source input
 * @param {...any}   params     Function params
 *
 * @returns {any}
 *
 * @name reduce
 * @tag Array
 * @signature (fn: Function, defaultAcc: mixed) => (input: Array): mixed
 * @signature (fn: Function, defaultAcc: mixed, input: Array): mixed
 *
 * @example
 * const sum = (acc, item) => acc + item
 *
 * reduce(sum, 0, [1, 2])
 * // => 3
 */
export const reduce = (...params) => {
  // @signature (fn, defaultAcc) => (input)
  if (params.length <= 2) {
    return input => _reduce(params[0], params[1], input)
  }

  // @signature (fn, defaultAcc, input)
  return _reduce(...params)
}
