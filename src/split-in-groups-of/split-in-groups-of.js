const _splitInGroupsOf = (size, source) => {
  if (size <= 0) {
    throw new Error(
      `splitInGroupsOf - invalid 'size' parameter value '${size}'. 'size' value should be a positive, non-zero, integer.`
    )
  }

  if (!Array.isArray(source)) {
    throw new TypeError(
      `splitInGroupsOf - invalid 'source' parameter type '${typeof source}'. 'source' type should be Array.`
    )
  }

  const result = []
  const groupCount = Math.ceil(source.length / size)

  for (let i = 0; i < groupCount; ++i) {
    const startIndex = i * size
    const endIndex = (i + 1) * size

    result.push(source.slice(startIndex, endIndex))
  }

  return result
}

/**
 * Split an array into multiple arrays of set size
 *
 * @tag Array
 * @signature (size: number, source: Array): Array
 * @signature (size: number) => (source: Array): Array
 *
 * @param {...any} params
 * @param {number} params.size
 * @param {Array}  params.source
 *
 * @returns {Array[]}
 *
 * @example
 * split(2, [1, 2, 3, 4])
 * // [[1, 2], [3, 4]]
 */
export const splitInGroupsOf = (...params) => {
  // @signature (size) => (source)
  if (params.length <= 1) {
    return source => _splitInGroupsOf(params[0], source)
  }

  // @signature (size, source)
  return _splitInGroupsOf(...params)
}
