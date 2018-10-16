const deepEqual = require("../core__deep-equal/deep-equal")

/**
 * Remove repeating values
 *
 * @param  {Array}  source  The source
 *
 * @return {Array}
 *
 * @tag Array
 * @signature ( source: Array ): Array
 *
 * @example
 * distinct( [1, 1, 2] )
 * // => [1, 2]
 */
module.exports = source => {
  const result = []

  for (let i = 0, length = source.length; i < length; i++) {
    const newElement = source[i]
    let shouldAdd = true

    for (let j = 0, resLength = result.length; j < resLength; j++) {
      const resElement = result[j]

      if (deepEqual(newElement)(resElement)) {
        shouldAdd = false
        break
      }
    }

    shouldAdd && result.push(newElement)
  }

  return result
}
