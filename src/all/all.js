import { pipe } from "../pipe/pipe"
import { curry } from "../curry/curry"
import { isMatch } from "../is-match/is-match"

const _all = (_fn, _source) => {
  const source = Array.isArray(_source) ? _source : [_source]
  const fn = Array.isArray(_fn) ? pipe(..._fn) : _fn

  for (let i = 0, length = source.length; i < length; i++) {
    if (fn(source[i]) !== true) {
      return false
    }
  }

  return true
}

const _allWith = (subset, source) => _all(isMatch(subset), source)

/**
 * Test if all elements of array satisfy a function
 *
 * @param {Function|Function[]} fn     Test function called on each elements
 * @param {Array}               source Source array to iterate over
 *
 * @returns {boolean} True if all elements pass, otherwise false
 *
 * @name all
 * @tag Array
 * @signature (fn: Function|Function[], source: Array): Boolean
 *
 * @see {@link allWith}
 * @see {@link any}
 * @see {@link anyWith}
 *
 * @example
 * all(isNumber)([1, 2, 3])
 * // => true
 *
 * all(is, [1, "asd", null])
 * // => false
 */
export const all = curry(_all)

/**
 * Test if all elements in array match object
 *
 * @param {object} subset Match object
 * @param {Array}  source Source array to iterate over
 *
 * @returns {boolean}        True if all elements match, otherwise false
 *
 * @name allWith
 * @tag Array
 * @signature (subset: Object, source: Array): Boolean
 *
 * @see {@link all}
 * @see {@link any}
 * @see {@link anyWith}
 * @see {@link isMatch}
 *
 * @example
 * allWith(isNumber)([1, 2, 3])
 * // => true
 *
 * allWith(is, [1, "asd", null])
 * // => false
 */
export const allWith = curry(_allWith)
