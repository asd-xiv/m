import { any } from "../any/any.js"
import { curry } from "../curry/curry.js"
import { isEqual } from "../is-equal/is-equal.js"

const _distinctBy = (predicateFn, input) => {
  const result = []

  for (let i = 0, length = input.length; i < length; i++) {
    const newElement = input[i]

    if (any(item => predicateFn(newElement, item), result) === false) {
      result.push(newElement)
    }
  }

  return result
}

/**
 * Remove repeating values
 *
 * @param {Array} input Source input array
 *
 * @returns {Array}
 *
 * @name distinct
 * @tag Array
 * @signature (input: Array): Array
 *
 * @example
 * distinct([1, 1, 2])
 * // => [1, 2]
 */
export const distinct = input => _distinctBy(isEqual, input)

export const distinctBy = curry(_distinctBy)
