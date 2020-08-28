import { any } from "../any/any"
import { isDeepEqual } from "../deep-equal/deep-equal"

/**
 * Remove repeating values
 *
 * @param {Array} source Source input array
 *
 * @return {Array}
 *
 * @name distinct
 * @tag Array
 * @signature (source: Array): Array
 *
 * @example
 * distinct([1, 1, 2])
 * // => [1, 2]
 */
export const distinct = source => {
  const result = []

  for (let i = 0, length = source.length; i < length; i++) {
    const newElement = source[i]

    if (any(isDeepEqual(newElement), result) === false) {
      result.push(newElement)
    }
  }

  return result
}
