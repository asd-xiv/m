import { curry } from "../curry/curry.js"

const _prepend = (subset, input) => {
  if (Array.isArray(input)) {
    return Array.isArray(subset) ? [...subset, ...input] : [subset, ...input]
  }

  return subset + input
}

/**
 * Add array or element at begining of array
 *
 * @param {any|Array} subset Content to add
 * @param {Array}     input  Source array to prepend to
 *
 * @returns {Array}
 *
 * @tag Array
 * @signature (subset: String, input: String) => String
 * @signature (subset: mixed|Array, input: Array) => Array
 *
 * @example
 * prepend([1])([4, 5])
 * // => [1, 4, 5]
 */
export const prepend = curry(_prepend)
