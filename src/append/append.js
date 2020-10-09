const _append = (subset, source) => {
  if (subset === undefined) {
    return source
  }

  if (Array.isArray(source)) {
    return source.concat(subset)
  }

  return source + subset
}

/**
 * Add array or element at the end of array
 *
 * @param {mixed|Array} subset Content to add
 * @param {Array}       source Source array to append to
 *
 * @returns {Array}
 *
 * @tag Array
 * @signature (subset: String) => (source: String) => String
 * @signature (subset: String, source: String) => String
 * @signature (subset: mixed|Array) => (source: Array) => Array
 * @signature (subset: mixed|Array, source: Array) => Array
 *
 * @example
 * append([1])([4, 5])
 * // => [1, 4, 5]
 */
export const append = (...params) => {
  // @signature (fn) => (source)
  if (params.length <= 1) {
    return source => _append(params[0], source)
  }

  // @signature (fn, source)
  return _append(...params)
}
