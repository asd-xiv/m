import { curry } from "../curry/curry.js"
import { is } from "../is/is.js"

const _endsWith = (search, input) => {
  if (!is(input)) {
    return false
  }

  if (search.length > input.length) {
    return false
  }

  const searchPosition = input.indexOf(search)

  if (searchPosition === -1) {
    return false
  }

  return searchPosition === input.length - search.length
}

/**
 * Test if string ends with substring
 *
 * @param {string} search Search string
 * @param {string} source Source string
 *
 * @returns {boolean}
 *
 * @tag String
 * @signature (search: String, source: String): Boolean
 * @signature (search: String)(source: String): Boolean
 *
 * @example
 * endWith("ipsum", "lorem ipsum")
 * // => true
 */
export const endsWith = curry(_endsWith)
