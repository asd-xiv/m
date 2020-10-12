import { curry } from "../curry/curry"

const _dropLast = curry((count, source) =>
  count > source.length ? [] : source.slice(0, source.length - count)
)

/**
 * Remove elements from end of array
 *
 * @param {number} count  Number of element to remove (default 1)
 * @param {Array}  source Source array
 *
 * @return {Array}
 *
 * @tag Array
 * @signature (count: number, source: Array): Array
 * @signature (source: Array): Array
 */
export const dropLast = count => {
  if (Array.isArray(count)) {
    return _dropLast(1, count)
  }

  return _dropLast(count)
}
