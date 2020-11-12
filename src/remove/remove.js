import { curry } from "../curry/curry"
import { pipe } from "../pipe/pipe"
import { isMatch } from "../is-match/is-match"

const _remove = (_fn, source) => {
  const fn = Array.isArray(_fn) ? pipe(..._fn) : _fn
  const result = []
  const isPredicate = typeof fn === "function"

  for (let i = 0, length = source.length; i < length; i++) {
    const shouldRemove = isPredicate ? fn(source[i]) === true : source[i] === fn

    if (!shouldRemove) {
      result.push(source[i])
    }
  }

  return result
}

/**
 * Remove element(s) from array by value or by predicate
 *
 * @param {Function|mixed} fn     Value to remove or predicate to match
 * @param {Array}          source Source array
 *
 * @returns {Array}
 *
 * @name remove
 * @tag Array
 * @signature (fn: Any) => (source: Array): Array
 * @signature (fn: Any, source: Array): Array
 *
 * @example
 * remove(3)([1, 2, 3])
 * // => [1, 2]
 *
 * remove(_ => _ === 3)([1, 2, 3])
 * // => [1, 2]
 */
export const remove = curry(_remove)

/**
 * Remove element(s) by matching object
 *
 * @param {object} subset Match object
 * @param {Array}  source Source array
 *
 * @returns {Array}
 *
 * @name removeWith
 * @tag Array
 * @signature (subset: Object) => (source: Array): Array
 * @signature (subset: Object, source: Array): Array
 *
 * @example
 * remove(3)([1, 2, 3])
 * // => [1, 2]
 *
 * remove(_ => _ === 3)([1, 2, 3])
 * // => [1, 2]
 */
export const removeWith = curry((subset, source) =>
  _remove(isMatch(subset), source)
)
