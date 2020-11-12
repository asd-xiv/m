import { map } from "../map/map"
import { isMatch } from "../is-match/is-match"
import { type } from "../type/type"

/**
 * Replace substring in string
 *
 * @param {string} oldString The old string
 * @param {string} newString The new string
 *
 * @returns {string}
 */
const replaceString = (oldString, newString) => source =>
  "".replace.call(source, oldString, newString)

/**
 * Replace element in array (shallow equal)
 *
 * @param {mixed} oldElm The old elm
 * @param {mixed} newElm The new elm
 *
 * @returns {Array}
 */
const replaceArray = (oldElm, newElm) => source => {
  const result = []

  for (let i = 0, length = source.length - 1; i <= length; i++) {
    if (oldElm === source[i]) {
      result.push(newElm)
    } else {
      result.push(source[i])
    }
  }

  return result
}

/**
 * Replace substring if source is string, replace element (shallow equal) if
 * source is Array
 *
 * @param {string|mixed} oldElm To be cloned
 * @param {string|mixed} newElm Copy of this object.
 * @param {string|Array} source Source array
 *
 * @returns {string|Array}
 *
 * @tag String,Array
 * @signature (oldElm: string|mixed, newElm: string|mixed) => (source: Array): Array
 *
 */
const replace = (oldElm, newElm) => source => {
  const sourceType = type(source)
  const byType = {
    String: replaceString,
    Array: replaceArray,
  }

  return byType[sourceType](oldElm, newElm)(source)
}

/**
 * Replace object element in array using filter object
 *
 * @tag Array
 * @signature (filter: Obj, replace: Obj|Function) => (source: Obj[]): Obj[]
 *
 * @param {object}   filter   Filter object to match against each element
 * @param {object}   newValue Object to replace matching elements
 * @param {object[]} source   Source array
 *
 * @returns {Array}
 *
 * @example
 * replaceWith(
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
 * replaceWith({ id: 2 }, item => ({
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
const replaceWith = (filter, newValue) =>
  map(item =>
    isMatch(filter)(item)
      ? typeof newValue === "function"
        ? newValue(item)
        : newValue
      : item
  )

export { replace, replaceWith }
