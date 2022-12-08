import { type } from "../type/type.js"
import { is } from "../is/is.js"

/**
 * @callback HistByArray
 * Count the number of occurances of each element
 *
 * @param {Array} input Source input
 *
 * @returns {function(Array): Object}
 */

/**
 * @type {HistByArray}
 *
 * @example
 * byArray([1, 2, 3, 2, 3, 3]) // => { "1": 1, "2": 2, "3": 3 }
 */
const byArray = input => {
  const result = {}

  for (let i = 0, length = input.length - 1; i <= length; i++) {
    result[input[i]] = is(result[input[i]]) ? result[input[i]] + 1 : 1
  }

  return result
}

/**
 * @callback HistByKey
 * Count the number of occurances of each object by a field
 * @param {string} field The field
 * @returns {function(Object[]): Object}
 */

/**
 * @type {HistByKey}
 * @example
 * byKey("name")([{ name: "Bob" }, { name: "Alice" }, { name: "Bob" }]) // => { "Bob": 2, "Alice": 1 }
 */
const byKey = field => input => {
  const result = {}

  for (let i = 0, length = input.length; i < length; i++) {
    if (!!input[i][field]) {
      const groupKey = String(input[i][field])

      result[groupKey] = result[groupKey] ? result[groupKey] + 1 : 1
    }
  }

  return result
}

const byType = {
  Array: byArray,
  String: byKey,
}

/**
 * Determine the count of all field's distinct values in a list of objects
 * (aka histogram)
 *
 * @tag Array
 * @signature (field: string)(source: Object[]): Object
 *
 * @param {string}   field  Field name to count
 *
 * @returns {HistByArray|HistByKey} a function of an Array
 *
 * @example
 *
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
 * hist( "score" )( scores )
 * // => { "1": 1, "10": 2 }
 */
const hist = field => byType[type(field)](field)

export { hist }
