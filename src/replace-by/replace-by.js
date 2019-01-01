const isMatch = require("../is-match/is-match")

/**
 * Replace object element in array using filter object
 *
 * @tag Array
 * @signature (filter: Obj, replace: Obj|Function) => (source: Obj[]): Obj[]
 *
 * @param  {Object}    filter   Filter object to match against each element
 * @param  {Object}    replace  Object to replace matching elements
 * @param  {Object[]}  source   Source array
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
 *
 * replaceBy({ id: 2 }, item => ({
 *   ...item,
 *   content: ["new", "updated", "field"],
 * }))([
 *   { id: 1, name: "foo", content: [] },
 *   { id: 2, name: "bar", content: [] },
 * ])
 * // [
 * //   { id: 1, name: "foo", content: [] },
 * //   { id: 2, name: "bar", content: ["new", "updated", "field"] },
 * // ],
 */
module.exports = (filter, replace) => source => {
  const result = []

  for (let i = 0, length = source.length; i < length; i++) {
    if (isMatch(filter)(source[i])) {
      result.push(typeof replace === "function" ? replace(source[i]) : replace)
    } else {
      result.push(source[i])
    }
  }

  return result
}
