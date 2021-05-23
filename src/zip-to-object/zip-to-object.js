import { curry } from "../curry/curry"

/**
 * Create an object from two arrays, one containing keys, the other values.
 * Both arrays will be trimmed to the smallest length.
 *
 * @param {Array} keys
 * @param {Array} values
 *
 * @returns {Object}
 *
 * @name zipToObject
 * @tag Array
 * @signature (keys: Array, values: Array): Object
 *
 * @example
 * zipToObject([a, b])([1, 2]) // => { a: 1, b: 2 }
 * zipToObject([a], [1, 2]) // => { a: 1 }
 */
const zipToObject = curry((keys, values) => {
  const result = {}
  const length = Math.min(keys.length, values.length)

  for (let index = 0; index < length; index++) {
    result[keys[index]] = values[index]
  }

  return result
})

export { zipToObject }
