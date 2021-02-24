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
 * @param {...any}       params
 * @param {Function|any} params.fn     Value to remove or predicate to match
 * @param {Array}        params.source
 *
 * @returns {Array}
 *
 * @name remove
 * @tag Array
 * @signature (fn: Any) => (source: Array): Array
 * @signature (fn: Any, source: Array): Array
 * @example
 * remove(3)([1, 2, 3])
 * // => [1, 2]
 *
 * remove(_ => _ === 3)([1, 2, 3])
 * // => [1, 2]
 */
export const remove = (...params) => {
  // @signature (fn) => (source)
  if (params.length <= 1) {
    return source => _remove(params[0], source)
  }

  // @signature (fn, source)
  return _remove(...params)
}

/**
 * Remove element(s) by matching object
 *
 * @param {...any} params
 * @param {Object} params.subset Match object
 * @param {Array}  params.source Source array
 *
 * @returns {Array}
 *
 * @name removeWith
 * @tag Array
 * @signature (subset: Object) => (source: Array): Array
 * @signature (subset: Object, source: Array): Array
 * @example
 * removeWith(
 *   {
 *     tag: not(is)
 *   },
 *   [
 *     {id: 1, tag: 2},
 *     {id: 2}
 *   ]
 * )
 * // => [{id: 1, tag: 2}]
 */
export const removeWith = (...params) => {
  const [subset, ...rest] = params

  // @signature (subset) => (source)
  if (params.length <= 1) {
    return source => _remove(isMatch(subset), source)
  }

  // @signature (subset, source)
  return _remove(isMatch(subset), ...rest)
}
