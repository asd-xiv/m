import { findIndex } from "../find-index/find-index.js"
import { curry } from "../curry/curry.js"
import { distinctBy } from "../distinct/distinct.js"
import { isEqual } from "../is-equal/is-equal.js"

const _joinBy = (predicateFn, mergeFn, aList, bList) => {
  if (aList.length === 0) {
    return bList
  }

  if (bList.length === 0) {
    return aList
  }

  const result = distinctBy(predicateFn, aList)

  for (const b of bList) {
    const aIndex = findIndex(item => predicateFn(item, b), result)

    if (aIndex === -1) {
      result.push(b)
    } else {
      result[aIndex] = mergeFn(result[aIndex], b)
    }
  }

  return result
}

const _join = (aList, bList) => _joinBy(isEqual, a => a, aList, bList)

/**
 * Combine two arrays into one a set (array of unique items), composed of items
 * from both arrays.
 *
 * The function starts with the distinct items from aList and each item of bList
 * will be searched using a shallow equal. If found, it will be discarded.
 *
 * @param {any[]} aList
 * @param {any[]} bList
 *
 * @returns {any[]}
 *
 * @name join
 * @tag Array
 * @signature (aList: any[], bList: any[]): any[]
 *
 * @see {@link overlapBy}
 * @see {@link intersect}
 * @see {@link intersectBy}
 *
 * @example
 * join([1, 1, 2, 3, 3], [3, 3, 4, 4, 5])
 * // => [1, 2, 3, 4, 5]
 */
export const join = curry(_join)

export const joinBy = curry(_joinBy)
