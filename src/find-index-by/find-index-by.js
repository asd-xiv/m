const isMatch = require("../is-match/is-match")

/**
 * Find the position of first element that matches the filter criteria
 *
 * @param  {Object}    filter  Object containing one or more fields
 * @param  {Object[]}  source  Source input
 *
 * @return {number}
 *
 * @name findIndexBy
 * @tag Array
 * @signature (filter: Object) => (source: Object[]): number
 *
 * @example
 * const comments = [{id: 1, body: ""}, {id: 2, body: "dolor"}]
 *
 * findIndexBy({id: 2})(comments)
 * // => 1
 * findIndexBy({id: 3})(comments)
 * // => -1
 */
module.exports = filter => source => {
  for (let i = 0, length = source.length - 1; i <= length; i++) {
    if (isMatch(filter)(source[i])) {
      return i
    }
  }

  return -1
}
