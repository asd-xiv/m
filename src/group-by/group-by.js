/**
 * Group an array of objects by field.
 *
 * @param  {string}  field   The field to index by. Value will be cast to string
 *                           before indexing.
 * @param  {Array}   source  Input array
 *
 * @return {Array<Array>}
 *
 * @example
 * groupBy("user_id")([
 *   {id: 1, user_id: 2},
 *   {id: 2, user_id: 3},
 *   {id: 3, user_id: 2},
 *   {id: 4, user_id: null},
 * ] )
 * // => [
 * //   [{id: 1, user_id: 2}, {id: 3, user_id: 2}],
 * //   [{id: 2, user_id: 3}],
 * //   [{id: 4, user_id: null}],
 * // ]
 */
module.exports = field => input => {
  const result = {}

  for (let i = 0, length = input.length; i < length; i++) {
    const groupKey = String(input[i][field])

    if (result[groupKey]) {
      result[groupKey].push(input[i])
    } else {
      result[groupKey] = [input[i]]
    }
  }

  return Object.values(result)
}
