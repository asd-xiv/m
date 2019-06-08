/**
 * Index an array of objects by field. Only truthy fields will be indexed.
 *
 * @param  {string}  field  The field to index by
 * @param  {Array}   array  Input
 *
 * @return {Object}
 *
 * @tag Array
 * @signature (field: string) => (source: Object[]): Object
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
const indexBy = field => source => {
  const result = {}

  for (let i = 0, length = source.length; i < length; i++) {
    if (source[i][field]) {
      const indexKey = String(source[i][field])

      result[indexKey] = source[i]
    }
  }

  return result
}

export { indexBy }
