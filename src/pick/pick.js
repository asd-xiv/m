/**
 * @param {string}   key    Field name to extract values from
 * @param {Object[]} source Array of objects
 *
 * @returns {Array}
 */
const _pick = (key, source) => {
  const result = []

  for (let i = 0, length = source.length; i < length; i++) {
    result.push(source[i][key])
  }

  return result
}

/**
 * Returns a new list by extracting the same named property off all objects in
 * the source list
 *
 * @param {...any} params
 *
 * @returns {Array}
 *
 * @tag Array
 * @signature (key: string) => (source: object[]): mixed[]
 *
 * @example
 * pick("position")([{id: 1, position: 3}, {id:2, position: -1}])
 * // => [3, -1]
 */
export const pick = (...params) => {
  // @signature (key) => (source)
  if (params.length <= 1) {
    return source => _pick(params[0], source)
  }

  // @signature (key, source)
  return _pick(...params)
}
