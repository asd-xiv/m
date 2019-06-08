import { isMatch } from "../is-match/is-match"

/**
 * Find the position of first element that satisfies a function
 *
 * @param  {Function}    fn      Match function
 * @param  {Object[]}    source  Source array
 *
 * @return {number}
 *
 * @name findIndex
 * @tag Array
 * @signature (fn: Function) => (source: Object[]): number
 *
 * @example
 * const comments = [{ id: 1, body: "" }, { id: 2, body: "dolor" }]
 *
 * findIndex(item => item.id === 2)(comments)
 * // => 1
 * findIndex(item => item.id === 3)(comments)
 * // => -1
 */
const findIndex = fn => source => {
  for (let i = 0, length = source.length; i < length; i++) {
    const found = fn(source[i], i, source)

    if (found === true) {
      return i
    }
  }

  return -1
}

const findIndexWith = subset => findIndex(isMatch(subset))

export { findIndex, findIndexWith }
