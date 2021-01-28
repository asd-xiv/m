import { type } from "../type/type"
import { is } from "../is/is"

/**
 * Count the number of occurances of each element
 *
 * @param {Array} source Source input
 *
 * @returns {object}
 */
const byArray = source => {
  const result = {}

  for (let i = 0, length = source.length - 1; i <= length; i++) {
    result[source[i]] = is(result[source[i]]) ? result[source[i]] + 1 : 1
  }

  return result
}

/**
 * Count the number of occurances of each object by a field
 *
 * @param {string} field The field
 *
 * @returns {object}
 */
const byKey = field => source => {
  const result = {}

  for (let i = 0, length = source.length; i < length; i++) {
    if (!!source[i][field]) {
      const groupKey = String(source[i][field])

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
 * @param {object[]} source Array of objects
 *
 * @returns {object}
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
