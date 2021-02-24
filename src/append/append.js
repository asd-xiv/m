import { curry } from "../curry/curry"

const _append = (subset, source) => {
  if (Array.isArray(source)) {
    return [...source, ...(Array.isArray(subset) ? subset : [subset])]
  }

  return source + subset
}

/**
 * Add array or element at the end of array
 *
 * @param {any|Array} subset Content to add
 * @param {Array}     source Source array to append to
 *
 * @returns {Array}
 *
 * @name append
 * @tag Array
 * @signature (subset: String, source: String) => String
 * @signature (subset: mixed|Array, source: Array) => Array
 *
 * @see {@link prepend}
 *
 * @example
 * append([1])([4, 5])
 * // => [1, 4, 5]
 */
export const append = curry(_append)
