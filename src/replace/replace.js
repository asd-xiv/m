import { map } from "../map/map.js"
import { isMatch } from "../is-match/is-match.js"
import { type } from "../type/type.js"

/**
 * Replace substring in string
 *
 * @internal
 * @param {string} oldString The old string
 * @param {string} newString The new string
 *
 * @returns {function(string): string}
 */
const _replaceString = (oldString, newString) => input =>
  String.prototype.replace.call(input, oldString, newString)

/**
 * Replace element in array (shallow equal)
 *
 * @internal
 * @param {any} oldElm
 * @param {any} newElm
 *
 * @returns {function(Array): Array}
 */
const _replaceArray = (oldElm, newElm) => input => {
  const result = []

  for (let i = 0, length = input.length - 1; i <= length; i++) {
    if (oldElm === input[i]) {
      result.push(newElm)
    } else {
      result.push(input[i])
    }
  }

  return result
}

/**
 * Replace substring if source is string, replace element (shallow equal) if
 * source is Array
 *
 * @param {string|any}   oldElm
 * @param {string|any}   newElm
 *
 * @returns {function(any): string|Array}
 *
 * @tag String,Array
 * @signature (oldElm: string|any, newElm: string|any) => (source: Array): Array
 *
 * @example
 * replace("foo", "bar")("foo bar baz")
 * // => "bar bar baz"
 *
 * replace("foo", "wow")(["foo", "bar", "baz"])
 * // => ["wow", "bar", "baz"]
 */
const replace = (oldElm, newElm) => input => {
  const inputType = type(input)
  const byType = {
    String: _replaceString,
    Array: _replaceArray,
  }

  return byType[inputType](oldElm, newElm)(input)
}

/**
 * Replace object element in array using filter object
 *
 * @tag Array
 * @signature (filter: Obj, replace: Obj|Function) => (source: Obj[]): Obj[]
 *
 * @param {Object}   filter   Filter object to match against each element
 * @param {Object}   newValue Object to replace matching elements
 *
 * @returns {function(Array): Array}
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
