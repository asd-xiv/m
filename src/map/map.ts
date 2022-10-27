import { pipe } from "../pipe/pipe"

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

type MapMorphism<I, O> = (item: I, index: number, array: I[]) => O[]

interface Map {
  <I, O>(fn: MapMorphism<I, O>, input: I[]): O[]
  <I, O>(fn: MapMorphism<I, O>): (input: I[]) => O[]
}

export const map: Map = (...params) => {
  if (params.length <= 1) {
    return input => map(params[0], input)
  }

  const [_fn, _input] = params
  const input = Array.isArray(_input) ? _input : [_input]
  const fn = Array.isArray(_fn) ? pipe(..._fn) : _fn
  const result = []

  for (let i = 0, valuesCount = input.length; i < valuesCount; ++i) {
    result.push(fn(input[i], i, input))
  }

  return result
}
