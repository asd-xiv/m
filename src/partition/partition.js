/* eslint-disable no-unused-vars*/

import { pipe } from "../pipe/pipe.js"
import { curry } from "../curry/curry.js"
import { isMatch } from "../is-match/is-match.js"

const _partition = (_fn, input) => {
  const fn = Array.isArray(_fn) ? pipe(..._fn) : _fn
  const pass = []
  const fail = []

  for (let i = 0; i < input.length; ++i) {
    if (fn(input[i], i, input)) {
      pass.push(input[i])
    } else {
      fail.push(input[i])
    }
  }

  return [pass, fail]
}

/**
 * Split an array based on a predicate function.
 * Take `A[]` and return a two-tuple of `A[]`s. The first element of the tuple
 * consists of elements for which the predicate returned `true`, the second of
 * elements for which it returned `false`.
 *
 * @param {Function} fn A predicate function.
 *
 * @returns {Array<Array, Array>}
 *
 * @name partition
 * @tag Array
 * @signature (fn: Function|Function[], input: Array) => Array<Array, Array>
 *
 * @example
 * partition(x => x % 2 === 0)([1, 2, 3, 4, 5])
 * // => [[2, 4], [1, 3, 5]]
 */
export const partition = curry(_partition)

/**
 * Split an array based on object matching
 * Take `A[]` and return a two-tuple of `A[]`s. The first element of the tuple
 * consists of elements for which the predicate returned `true`, the second of
 * elements for which it returned `false`.
 *
 * @param {object} subset A predicate function.
 *
 * @returns {Array<Array, Array>}
 *
 * @name partitionWith
 * @tag Array
 * @signature (subset: Object, input: Array) => Array<Array, Array>
 *
 * @example
 * partitionWith({comments: is}, [{id: 1}, {id: 2, comments: []}])
 * // => [[{id: 1}], [{id: 2, comments: []}]]
 */
export const partitionWith = curry((subset, input) =>
  _partition(isMatch(subset), input)
)
