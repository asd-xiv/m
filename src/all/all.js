import { isMatch } from "../is-match/is-match"

/**
 * Test if all elements of array satisfy function
 *
 * @tag Core
 * @signature (fn: Function) => (source: Array): boolean
 * @see        {@link allWith}
 * @see        {@link isMatch}
 * @see        {@link any}
 * @see        {@link anyWith}
 *
 * @param {Function}  fn      Function that all elements need to satisfy
 * @param {Array}     source  Source array
 *
 * @return {boolean}
 *
 * @example
 * all(isNumber)([1, 2, 3])
 * // => true
 * all(is)([1, "asd", null])
 * // => false
 */
const all = fn => source => {
  for (let i = 0, length = source.length - 1; i <= length; i++) {
    if (fn.call(null, source[i]) !== true) {
      return false
    }
  }

  return true
}

const allWith = subset => all(isMatch(subset))

export { all, allWith }
