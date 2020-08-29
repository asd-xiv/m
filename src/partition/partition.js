/* eslint-disable no-unused-vars*/

import { isMatch } from "../is-match/is-match"
import { pipe } from "../pipe/pipe"
import { reduce } from "../reduce/reduce"

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
 * Split a list based on a predicate function
 *
 * @param  {Function} fn  A predicate function.
 *
 * @return {[[], []]}
 * A function taking a `A[]` and returning a two-tuple of `A[]`s.
 * The first element of the tuple consists of elements for which
 * the predicate returned `true`, the second of elements for which
 * it returned `false`.
 *
 * @name partition
 * @tag Array
 * @signature (fn: Function|Funciton[]) => (source: Array) => [[], []]
 * @signature (fn: Function|Funciton[], source: Array) => [[], []]
 *
 * @example
 * partition(x => x % 2 === 0)([1, 2, 3, 4, 5])
 * // => [[2, 4], [1, 3, 5]]
 */
export const partition = (...params) => {
  // @signature (fn) => (source)
  if (params.length <= 1) {
    return source => _partition(params[0], source)
  }

  // @signature (fn, source)
  return _partition(...params)
}

/**
 * Split a list based on object matching
 *
 * @param {Object} subset A predicate function.
 *
 * @return {[[], []]}
 * A function taking a `A[]` and returning a two-tuple of `A[]`s.
 * The first element of the tuple consists of elements for which
 * the predicate returned `true`, the second of elements for which
 * it returned `false`.
 *
 * @name partitionWith
 * @tag Array
 * @signature (subset: Object) => (source: Array) => [[], []]
 * @signature (subset: Object, source: Array) => [[], []]
 *
 * @example
 * partitionWith({comments: is}, [{id: 1}, {id: 2, comments: []}])
 * // => [[{id: 1}], [{id: 2, comments: []}]]
 */
export const partitionWith = (...params) => {
  // @signature (subset) => (source)
  if (params.length <= 1) {
    return source => _partition(isMatch(params[0]), source)
  }

  // @signature (subset, source)
  return _partition(isMatch(params[0]), params[1])
}
