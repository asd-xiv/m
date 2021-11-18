import { curry } from "../curry/curry.js"

const _contains = (search, input) => {
  if (search.length > input.length) {
    return false
  }

  return input.includes(search)
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
