import { pipe } from "../pipe/pipe.js"
import { curry } from "../curry/curry.js"

const _map = (_fn, _input) => {
  const result = []
  const input = Array.isArray(_input) ? _input : [_input]
  const fn = Array.isArray(_fn) ? pipe(..._fn) : _fn

  for (let i = 0, valuesCount = input.length; i < valuesCount; ++i) {
    result.push(fn(input[i], i, input))
  }

  return result
}

/**
 * Iterates over an array and applies a function on each element, returning a
 * new array with the transformed elements.
 *
 * @param {Function|Function[]} fn    Transform function called on each element
 * @param {Array}               input Source array to iterate over
 *
 * @returns {Array} Returns new instance
 *
 * @name map
 * @tag Array
 * @signature (fn: Fn|Fn[], input: Array) => Array
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
export const map = curry(_map)
