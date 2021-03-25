/* eslint-disable no-unused-vars*/

import { pipe } from "../pipe/pipe"
import { reduce } from "../reduce/reduce"
import { curry } from "../curry/curry"
import { isMatch } from "../is-match/is-match"
import { is } from "../is/is"
import { map } from "../map/map"
import { distinct } from "../distinct/distinct"

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

const _partitionBy = (key, source) => {
  const result = [...source]

  const values = pipe(
    map(item => item[key]),
    distinct
  )(result)

  const partitioner = (acc, item) => {
    const partIndex = values.indexOf(item[key])

    if (partIndex === -1) {
      return acc
    }

    if (is(acc[partIndex])) {
      acc[partIndex].push(item)
    } else {
      acc[partIndex] = [item]
    }

    return acc
  }

  return reduce(partitioner, [])(result)
}

/**
 * Split a list based on a predicate function
 *
 * @param {Function} fn A predicate function.
 *
 * @returns {[[], []]}
 * A function taking a `A[]` and returning a two-tuple of `A[]`s.
 * The first element of the tuple consists of elements for which
 * the predicate returned `true`, the second of elements for which
 * it returned `false`.
 *
 * @name partition
 * @tag Array
 * @signature (fn: Function|Funciton[], source: Array) => [[], []]
 *
 * @example
 * partition(x => x % 2 === 0)([1, 2, 3, 4, 5])
 * // => [[2, 4], [1, 3, 5]]
 */
export const partition = curry(_partition)

/**
 * Split a list based on object matching
 *
 * @param {object} subset A predicate function.
 *
 * @returns {[[], []]}
 * A function taking a `A[]` and returning a two-tuple of `A[]`s.
 * The first element of the tuple consists of elements for which
 * the predicate returned `true`, the second of elements for which
 * it returned `false`.
 *
 * @name partitionWith
 * @tag Array
 * @signature (subset: Object, source: Array) => [[], []]
 *
 * @example
 * partitionWith({comments: is}, [{id: 1}, {id: 2, comments: []}])
 * // => [[{id: 1}], [{id: 2, comments: []}]]
 */
export const partitionWith = curry((subset, source) =>
  _partition(isMatch(subset), source)
)

export const partitionBy = curry(_partitionBy)
