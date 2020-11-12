import { curry } from "../curry/curry"

const _contains = (search, source) => {
  if (search.length > source.length) {
    return false
  }

  return source.indexOf(search) !== -1
}

/**
 * Test if string contains substring
 *
 * @param {string} search Search string
 * @param {string} source Source string
 *
 * @returns {boolean}
 *
 * @tag String
 * @signature (search: string, source: string): boolean
 *
 * @example
 * contains("ipsum")("lorem ipsum")
 * // => true
 */
export const contains = curry(_contains)
