import { map } from "../map/map"

/**
 * @param {string[]} keys   The properties to be filtered out
 * @param {object}   source The source object
 *
 * @returns {object}
 */
const _pluckOne = (keys, source) => {
  const result = {}

  for (let i = 0, length = keys.length; i < length; i++) {
    const key = keys[i]
    const value = source[key]

    if (Object.hasOwnProperty.call(source, key)) {
      result[key] = value
    }
  }

  return result
}

/**
 * @param {string[]}        keys
 * @param {object|object[]} source
 *
 * @returns {object|object[]}
 */
const _pluck = (keys, source) =>
  Array.isArray(source)
    ? map(item => _pluckOne(keys, item), source)
    : _pluckOne(keys, source)

/**
 * Returns a partial copy of an object containing only the keys specified.
 * If the key does not exist, the property is ignored.
 *
 * @param {...any} params
 *
 * @returns {object|object[]}
 *
 * @tag Object
 * @signature (keys: string[]) => (source: Object): Object
 *
 * @example
 * pluck(
 *  ["id", "name"],
 *  {
 *    id: 2,
 *    name: "lorem",
 *    description: "lorem ipsum"
 *  }
 * )
 * // => {id: 2, name: lorem}
 */
export const pluck = (...params) => {
  // @signature (keys) => (source)
  if (params.length <= 1) {
    return source => _pluck(params[0], source)
  }

  // @signature (keys, source)
  return _pluck(...params)
}
