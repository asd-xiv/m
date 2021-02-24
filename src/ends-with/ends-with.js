import { curry } from "../curry/curry"

const _endsWith = (search, source) => {
  if (search.length > source.length) {
    return false
  }

  const searchPosition = source.indexOf(search)

  if (searchPosition === -1) {
    return false
  }

  return searchPosition === source.length - search.length
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
