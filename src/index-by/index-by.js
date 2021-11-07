import { curry } from "../curry/curry.js"

const _indexBy = field => input => {
  const result = {}

  for (let i = 0, length = input.length; i < length; i++) {
    if (input[i][field]) {
      const indexKey = String(input[i][field])

      result[indexKey] = input[i]
    }
  }

  return result
}

/**
 * Index an array of objects by field. Only truthy fields will be indexed.
 *
 * @param {string} field  The field to index by
 * @param {Array}  source Input
 *
 * @returns {object}
 *
 * @tag Array
 * @signature (field: string, source: Object[]): Object
 *
 * @example
 * indexBy("id")([
 *   {id: 1, user_id: 2},
 *   {id: 2, user_id: 3},
 * ])
 * // => {
 * //   1: {id: 1, user_id: 2},
 * //   2: {id: 2, user_id: 3},
 * // }
 */
export const indexBy = curry(_indexBy)
