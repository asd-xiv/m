import { pipe } from "../pipe/pipe"
import { curry } from "../curry/curry"
import { isMatch } from "../is-match/is-match"
import { isObject } from "../is/is"

const _countBy = (_fn, _source) => {
  const source = isObject(_source) ? Object.entries(_source) : _source
  const fn = Array.isArray(_fn) ? pipe(..._fn) : _fn

  let result = 0

  for (let i = 0, length = source.length; i < length; i++) {
    if (fn.call(null, source[i]) === true) {
      result = result + 1
    }
  }

  return result
}

/**
 * Count the number of elements that satisfies a function
 *
 * @param {Function|Function[]} fn     Match function
 * @param {Array|Object}        source Source array, if object passed,
 *                                     Object.entries will be iterated over
 *
 * @return  {Number}
 *
 * @name count
 * @tag Array
 * @signature (fn: Function|Function[]) => (source: Array|Object): Number
 * @signature (fn: Function|Function[], source: Array|Object): Number
 *
 * @see {@link countWith}
 *
 * @example
 * const scores = [{
 *  name   : "Bob",
 *  score  : 1,
 *  subject: "Math"
 * }, {
 *  name   : "Alice",
 *  score  : 10,
 *  subject: "Math"
 * }, {
 *  name   : "Hatter",
 *  score  : 10,
 *  subject: "Math"
 * }]
 *
 * count(element => element.score === 10)(scores)
 * // => 2
 */
export const countBy = curry(_countBy)

/**
 * Count elements in array or object that match object
 *
 * @param {Object}       subset Match object
 * @param {Array|Object} source Source array, if object passed, Object.entries
 *                              will be iterated over
 *
 * @return {Number}
 *
 * @name countWith
 * @tag Array
 * @signature (subset: Object) => (source: Array|Object): Number
 * @signature (subset: Object, source: Array|Object): Number
 *
 * @see {@link count}
 *
 * @example
 * const scores = [{
 *  name   : "Bob",
 *  score  : 1,
 *  subject: "Math"
 * }, {
 *  name   : "Alice",
 *  score  : 10,
 *  subject: "Math"
 * }, {
 *  name   : "Hatter",
 *  score  : 10,
 *  subject: "Math"
 * }]
 *
 * countWith(
 *   { score: gt(5) },
 *   scores
 * )
 * // => 2
 */
export const countWith = curry((subset, source) =>
  _countBy(isMatch(subset), source)
)

export const count = source => {
  const type = Array.isArray(source) ? "array" : typeof source

  switch (type) {
    case "array":
    case "string":
      return source.length

    case "object": {
      if (source === null) {
        return 0
      }

      let result = 0,
        key

      for (key in source) {
        if (source.hasOwnProperty(key)) {
          result = result + 1
        }
      }

      return result
    }

    default:
      return 0
  }
}
