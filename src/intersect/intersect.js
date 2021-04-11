import { find } from "../find/find"
import { curry } from "../curry/curry"
import { any } from "../any/any"
import { isEqual } from "../is-equal/is-equal"

const _intersectBy = (predicateFn, mergeFn, aList, bList) => {
  if (aList.length === 0 || bList.length === 0) {
    return []
  }

  const result = []

  for (const b of bList) {
    const a = find(item => predicateFn(item, b), undefined, aList)

    if (a) {
      const alreadyAdded = any(item => predicateFn(item, a), result)

      if (!alreadyAdded) {
        result.push(mergeFn(a, b))
      }
    }
  }

  return result
}

const _intersect = (aList, bList) => _intersectBy(isEqual, a => a, aList, bList)

/**
 * Combine two arrays into one a set (array of unique items), composed of common
 * items from both arrays.
 *
 * The function starts with an empty array and each item of bList will be
 * searched in aList using a shallow equal. If it's found, it's also checked
 * if it has not been already added.
 *
 * @param {any[]} aList
 * @param {any[]} bList
 *
 * @returns {any[]}
 *
 * @name intersect
 * @tag Array
 * @signature (aList: any[], bList: any[]): any[]
 *
 * @see {@link intersectBy}
 * @see {@link overlap}
 * @see {@link overlapBy}
 *
 * @example
 * intersect([1, 2, 3, 3], [3, 3, 4, 5])
 * // => [3]
 */
export const intersect = curry(_intersect)

/**
 * Combine two arrays into one a set (array of unique items), composed of common
 * items from both arrays. Allow custom predicate and merge functions.
 *
 * The function starts with an empty array and each item of bList will be
 * searched in aList using a shallow equal. If it's found, it's also checked
 * if it has not been already added.
 *
 * @param {Function} predicateFn
 * @param {Function} mergeFn
 * @param {any[]}    aList
 * @param {any[]}    bList
 *
 * @returns {any[]}
 *
 * @name intersectBy
 * @tag Array
 * @signature (predicateFn: Funciton, mergeFn: Function, aList: any[], bList: any[]): any[]
 *
 * @see {@link intersect}
 * @see {@link overlap}
 * @see {@link overlapBy}
 *
 * @example
 * intersectBy(
 *   (a, b) => a.id === b.id,
 *   (a, b) => ({ ...a, ...b }),
 *   [
 *     { id: 1, lorem: "ipsum" },
 *     { id: 2, foo: "bar1" },
 *     { id: 2, foo: "bar2" },
 *   ],
 *   [
 *     { id: 2, comments: [] },
 *     { id: 3, comments: [] },
 *   ]
 * )
 * // => [{ id: 2, foo: "bar1", comments: [] }]
 */
export const intersectBy = curry(_intersectBy)
