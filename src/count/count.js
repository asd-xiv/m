import { isMatch } from "../is-match/is-match"

/**
 * Count the number of elements that satisfies a function
 *
 * @tag Array
 * @signature (fn: Function)(source: Array <Object>): number
 *
 * @param  {Function}  fn      Match function
 * @param  {Object[]}  source  Source array
 *
 * @return  {number}
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
const count = fn =>
  Array.isArray(fn)
    ? fn.length
    : source => {
        let _count = 0

        for (let i = 0, length = source.length; i < length; i++) {
          if (fn.call(null, source[i]) === true) {
            _count = _count + 1
          }
        }

        return _count
      }

const countWith = subset => count(isMatch(subset))

export { count, countWith }
