import { map } from "../map/map.js"

/**
 * @internal
 * @param {string[]} keys  The properties to be filtered out
 * @param {Object}   input The source object
 *
 * @returns {Object}
 */
const _pluckOne = (keys, input) => {
  const result = {}

  for (let i = 0, length = keys.length; i < length; i++) {
    const key = keys[i]
    const value = input[key]

    if (Object.hasOwnProperty.call(input, key)) {
      result[key] = value
    }
  }

  return result
}

/**
 * @internal
 * @param {string[]}          keys
 * @param {Object | Object[]} input
 *
 * @returns {Object | Object[]}
 */
const _pluck = (keys, input) =>
  Array.isArray(input)
    ? map(item => _pluckOne(keys, item), input)
    : _pluckOne(keys, input)

/**
 * Returns a partial copy of an object containing only the keys specified.
 * If the key does not exist, the property is ignored.
 *
 * @param {...any} params
 *
 * @returns {Object | Object[]}
 *
 * @name pluck
 * @tag Object
 * @signature (keys: string[]) => (input: Object): Object
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
  // @signature (keys) => (input)
  if (params.length <= 1) {
    return input => _pluck(params[0], input)
  }

  // @signature (keys, input)
  return _pluck(...params)
}
