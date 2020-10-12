import { curry } from "../curry/curry"

const _groupBy = (field, source) => {
  const result = {}

  for (let i = 0, length = source.length; i < length; i++) {
    const groupKey = String(source[i][field])

    if (result[groupKey]) {
      result[groupKey].push(source[i])
    } else {
      result[groupKey] = [source[i]]
    }
  }

  return Object.values(result)
}

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
export const groupBy = curry(_groupBy)
