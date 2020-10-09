const _prepend = (subset, source) => {
  if (Array.isArray(source)) {
    return Array.isArray(subset)
      ? subset.concat(source)
      : [subset].concat(source)
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
 * @signature (subset: String) => (source: String) => String
 * @signature (subset: String, source: String) => String
 * @signature (subset: mixed|Array) => (source: Array) => Array
 * @signature (subset: mixed|Array, source: Array) => Array
 *
 * @example
 * concat([1])([4, 5])
 * // => [1, 4, 5]
 */
export const prepend = (...params) => {
  // @signature (subset) => (source)
  if (params.length <= 1) {
    return source => _prepend(params[0], source)
  }

  // @signature (subset, source)
  return _prepend(...params)
}
