import { pipe } from "../pipe/pipe.js"
import { isMatch } from "../is-match/is-match.js"

const _remove = (_fn, input) => {
  const fn = Array.isArray(_fn) ? pipe(..._fn) : _fn
  const result = []
  const isPredicate = typeof fn === "function"

  for (let i = 0, length = input.length; i < length; i++) {
    const shouldRemove = isPredicate ? fn(input[i]) === true : input[i] === fn

    if (!shouldRemove) {
      result.push(input[i])
    }
  }

  return result
}

/**
 * Remove element(s) from array by value or by predicate
 *
 * @param {...any}       params
 * @param {Function|any} params.fn    Value to remove or predicate to match
 * @param {Array}        params.input
 *
 * @returns {Array}
 *
 * @name remove
 * @tag Array
 * @signature (fn: Any) => (input: Array): Array
 * @signature (fn: Any, input: Array): Array
 * @example
 * remove(3)([1, 2, 3])
 * // => [1, 2]
 *
 * remove(_ => _ === 3)([1, 2, 3])
 * // => [1, 2]
 */
export const remove = (...params) => {
  // @signature (fn) => (input)
  if (params.length <= 1) {
    return input => _remove(params[0], input)
  }

  // @signature (fn, input)
  return _remove(...params)
}

/**
 * Remove element(s) by matching object
 *
 * @param {...any} params
 * @param {Object} params.subset Match object
 * @param {Array}  params.input  Source array
 *
 * @returns {Array}
 *
 * @name removeWith
 * @tag Array
 * @signature (subset: Object) => (input: Array): Array
 * @signature (subset: Object, input: Array): Array
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

  // @signature (subset) => (input)
  if (params.length <= 1) {
    return input => _remove(isMatch(subset), input)
  }

  // @signature (subset, input)
  return _remove(isMatch(subset), ...rest)
}
