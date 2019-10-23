/* eslint-disable no-unused-vars*/

import { isMatch } from "../is-match/is-match"
import { reduce } from "../reduce/reduce"

/**
 * Split a list based on a predicate function.
 *
 * @signature (fn: Function => boolean) => (source: []) => [[], []]
 * @tag Array
 *
 * @param  {Function}  fn  A predicate function.
 *
 * @return {[[], []]}
 * A function taking a `A[]` and returning a two-tuple of `A[]`s.
 * The first element of the tuple consists of elements for which
 * the predicate returned `true`, the second of elements for which
 * it returned `false`.
 *
 * @example
 * partition(x => x % 2 === 0)([1, 2, 3, 4, 5])
 * // => [[2, 4], [1, 3, 5]]
 */
const partition = fn =>
  reduce(
    (acc, val, index, array) => {
      const [pass, fail] = acc

      return fn(val, index, array)
        ? [[...pass, val], fail]
        : [pass, [...fail, val]]
    },
    [[], []]
  )

const partitionWith = subset => partition(isMatch(subset))

export { partition, partitionWith }
