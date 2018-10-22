const isMatch = require("../core__is-match/is-match")

/**
 * Find and replace object in array
 *
 * @tag Array
 * @signature (filter: Object, newElm: Object) => (source: Object[]): Object[]
 *
 * @param  {Object}    filter  Filter object used to match against each element
 * @param  {Object}    newElm  Object to replace matching elements
 * @param  {Object[]}  source  Source array
 *
 * @return {Array}
 *
 * @example
 * replaceBy(
 *  {id: 2},
 *  {id: 2, title: "boss", isBoss: true}
 *  )([
 *    {id: 2, title:"minion"}
 *    {id: 3, title:"minion"}
 *  ])
 * // => [
 * //   {id: 2, title:"boss", isBoss: true},
 * //   {id: 3, title:"minion"}
 * // ]
 */
module.exports = (filter, newElm) => source => {
  const result = []

  for (let i = 0, length = source.length; i < length; i++) {
    if (isMatch(filter)(source[i])) {
      result.push(newElm)
    } else {
      result.push(source[i])
    }
  }

  return result
}
