/**
 * @internal
 * @param {string}   key   Field name to extract values from
 * @param {Object[]} input Array of objects
 *
 * @returns {Array}
 */
const _pick = (key, input) => {
  const result = []

  for (let i = 0, length = input.length; i < length; i++) {
    result.push(input[i][key])
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
 * @signature (key: string) => (input: object[]): mixed[]
 *
 * @example
 * pick("position")([{id: 1, position: 3}, {id:2, position: -1}])
 * // => [3, -1]
 */
export const pick = (...params) => {
  // @signature (key) => (input)
  if (params.length <= 1) {
    return input => _pick(params[0], input)
  }

  // @signature (key, input)
  return _pick(...params)
}
