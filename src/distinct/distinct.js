import { any } from "../any/any"
import { curry } from "../curry/curry"
import { isEqual } from "../is-equal/is-equal"

const _distinctBy = (predicateFn, source) => {
  const result = []

  for (let i = 0, length = source.length; i < length; i++) {
    const newElement = source[i]

    if (any(item => predicateFn(newElement, item), result) === false) {
      result.push(newElement)
    }
  }

  return result
}

/**
 * Remove repeating values
 *
 * @param {Array} source Source input array
 *
 * @returns {Array}
 *
 * @name distinct
 * @tag Array
 * @signature (source: Array): Array
 *
 * @example
 * distinct([1, 1, 2])
 * // => [1, 2]
 */
export const distinct = source => _distinctBy(isEqual, source)

export const distinctBy = curry(_distinctBy)
