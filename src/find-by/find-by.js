const isMatch = require("../is-match/is-match")

/**
 * Find the first element that matches the filter criteria
 *
 * @param  {Object}    filter  Object containing one or more fields
 * @param  {Object[]}  source  Source input
 *
 * @return  {Object|undefined}
 *
 * @example
 * const comments = [{id: 1, body: ""}, {id: 2, body: "dolor"}]
 *
 * findBy({id: 2})(comments)
 * // => {id: 2, body: "dolor"}
 */
module.exports = filter => source => {
  for (let i = 0, length = source.length - 1; i <= length; i++) {
    if (isMatch(filter)(source[i])) {
      return source[i]
    }
  }

  return undefined
}
