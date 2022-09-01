import { curry } from "../curry/curry.js"
import { is } from "../is/is.js"

const _endsWith = (search, input) => {
  const inputIsString = typeof input === "string"
  const inputIsArray = Array.isArray(input)

  if (!(inputIsString || inputIsArray)) {
    return false
  }

  if (!is(search)) {
    return false
  }

  const searchPosition = input.indexOf(search)

  if (searchPosition === -1) {
    return false
  }

  const targetPosition = inputIsString
    ? input.length - search.length
    : input.length - 1

  return searchPosition === targetPosition
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
