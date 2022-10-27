import { curry } from "../curry/curry.js"

const _dropLast = curry((count, input) =>
  count > input.length ? [] : input.slice(0, input.length - count)
)

/**
 * Remove elements from end of array
 *
 * @param {number} count Number of element to remove (default 1)
 * @param {Array}  input Source array
 *
 * @returns {Array}
 *
 * @tag Array
 * @signature (count: number, input: Array): Array
 * @signature (input: Array): Array
 */
export const dropLast = count => {
  if (Array.isArray(count)) {
    return _dropLast(1, count)
  }

  return _dropLast(count)
}
