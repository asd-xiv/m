import { curry } from "../curry/curry"
import { pipe } from "../pipe/pipe"

const _forEach = (_fn, _source) => {
  const fn = Array.isArray(_fn) ? pipe(..._fn) : _fn
  const source = Array.isArray(_source) ? _source : [_source]

  for (let i = 0, length = source.length; i < length; i++) {
    fn.call(null, source[i], i, source)
  }
}

/**
 * Call `fn` over each element of an array
 *
 * @param {Function|Function[]} fn     Iterator function
 * @param {Array}               source Source array
 *
 * @return {undefined}
 *
 * @tag Array
 * @signature (fn: Function|Function[], source: Array): undefined
 */
export const forEach = curry(_forEach)
