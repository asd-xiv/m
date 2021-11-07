import { curry } from "../curry/curry.js"
import { pipe } from "../pipe/pipe.js"

const _forEach = (_fn, _input) => {
  const fn = Array.isArray(_fn) ? pipe(..._fn) : _fn
  const input = Array.isArray(_input) ? _input : [_input]

  for (let i = 0, length = input.length; i < length; i++) {
    fn(input[i], i, input)
  }
}

/**
 * Call `fn` over each element of an array
 *
 * @param {Function|Function[]} fn     Iterator function
 * @param {Array}               source Source array
 *
 * @returns {undefined}
 *
 * @tag Array
 * @signature (fn: Function|Function[], source: Array): undefined
 */
export const forEach = curry(_forEach)
