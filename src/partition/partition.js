/* eslint-disable no-unused-vars*/

import { pipe } from "../pipe/pipe"
import { reduce } from "../reduce/reduce"
import { curry } from "../curry/curry"
import { isMatch } from "../is-match/is-match"

const _partition = (_fn, source) => {
  const fn = Array.isArray(_fn) ? pipe(..._fn) : _fn
  const pass = []
  const fail = []

  for (let i = 0; i < source.length; ++i) {
    if (fn(source[i], i, source)) {
      pass.push(source[i])
    } else {
      fail.push(source[i])
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
 * @signature (fn: Function|Function[], source: Array) => Array<Array, Array>
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
 * @signature (subset: Object, source: Array) => Array<Array, Array>
 *
 * @example
 * partitionWith({comments: is}, [{id: 1}, {id: 2, comments: []}])
 * // => [[{id: 1}], [{id: 2, comments: []}]]
 */
export const partitionWith = curry((subset, source) =>
  _partition(isMatch(subset), source)
)
