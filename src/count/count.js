const byArray = source => source.length

const byFunction = fn => source => {
  let count = 0

  for (let i = 0, length = source.length; i < length; i++) {
    if (fn.call(null, source[i]) === true) {
      count = count + 1
    }
  }

  return count
}

/**
 * Count the number of elements that satisfies a function
 *
 * @tag Array
 * @signature (fn: Function)(source: Array <Object>): number
 *
 * @param   {Function}        fn      Test function
 * @param   {Array <Object>}  source  Source array
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
 * count( element => element.score === 10 )( scores )
 * // => 2
 */
module.exports = fn => (Array.isArray(fn) ? byArray(fn) : byFunction(fn))
