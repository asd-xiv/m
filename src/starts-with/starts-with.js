const _startsWith = (search, source) => {
  if (search.length > source.length) {
    return false
  }

  const searchPosition = source.indexOf(search)

  if (searchPosition === -1) {
    return false
  }

  return searchPosition === 0
}

/**
 * Test if string starts with substring
 *
 * @param {string} search Search string
 * @param {string} source Source string
 * @param {...any} params Function params
 *
 * @returns {boolean}
 *
 * @name startsWith
 * @tag String
 * @signature (search: String) => (source: String): Boolean
 *
 * @example
 * startsWith("lorem", "lorem ipsum")
 * // => true
 *
 * startsWith("dolor")("lorem ipsum")
 * // false
 */
export const startsWith = (...params) => {
  // @signature (search) => (source)
  if (params.length <= 1) {
    return source => _startsWith(params[0], source)
  }

  // @signature (search, source)
  return _startsWith(...params)
}
