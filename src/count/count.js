import { pipe } from "../pipe/pipe.js"
import { curry } from "../curry/curry.js"
import { isMatch } from "../is-match/is-match.js"
import { isObject } from "../is/is.js"

const _countBy = (_fn, _input) => {
  const input = isObject(_input) ? Object.entries(_input) : _input
  const fn = Array.isArray(_fn) ? pipe(..._fn) : _fn

  let result = 0

  for (let i = 0, length = input.length; i < length; i++) {
    if (fn(input[i]) === true) {
      result = result + 1
    }
  }

  return result
}

/**
 * Count the number of elements that satisfies a function
 *
 * @param {Function|Function[]} fn     Match function
 * @param {Array|Object}        source If object passed, Object.entries will be iterated over
 *
 * @returns {number}
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
 * @param {Array|Object} source If object passed, Object.entries will be iterated over
 *
 * @returns {number}
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
export const countWith = curry((subset, input) =>
  _countBy(isMatch(subset), input)
)

export const count = input => {
  const type = Array.isArray(input) ? "array" : typeof input

  switch (type) {
    case "array":
    case "string":
      return input.length

    case "object": {
      if (input === null) {
        return 0
      }

      let result = 0,
        key

      for (key in input) {
        if (input.hasOwnProperty(key)) {
          result = result + 1
        }
      }

      return result
    }

    default:
      return 0
  }
}
