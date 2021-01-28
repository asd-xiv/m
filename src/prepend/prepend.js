import { curry } from "../curry/curry"

const _prepend = (subset, source) => {
  if (Array.isArray(source)) {
    return Array.isArray(subset) ? [...subset, ...source] : [subset, ...source]
  }

  return subset + source
}

/**
 * Add array or element at begining of array
 *
 * @param {mixed|Array} subset Content to add
 * @param {Array}       source Source array to prepend to
 *
 * @returns {Array}
 *
 * @tag Array
 * @signature (subset: String, source: String) => String
 * @signature (subset: mixed|Array, source: Array) => Array
 *
 * @example
 * prepend([1])([4, 5])
 * // => [1, 4, 5]
 */
export const prepend = curry(_prepend)
