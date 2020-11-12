import { curry } from "../curry/curry"

const _pluck = (field, source) => {
  const result = []

  for (let i = 0, length = source.length; i < length; i++) {
    result.push(source[i][field])
  }

  return result
}

/**
 * Returns a new list by extracting the same named property off all objects in
 * the source list
 *
 * @param {string}   field  Field name to extract values from
 * @param {object[]} source Array of objects
 *
 * @returns {number}
 *
 * @tag Array
 * @signature ( field: string ) => ( source: Object[] ): mixed[]
 *
 * @example
 * pluck("position")([{id: 1, position: 3}, {id:2, position: -1}])
 * // => [3, -1]
 */
export const pluck = curry(_pluck)
