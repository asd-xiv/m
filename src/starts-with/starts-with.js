import { is } from "../is/is.js"
import { curry } from "../curry/curry.js"

const _startsWith = (search, input) => {
  if (!(typeof input === "string" || Array.isArray(input))) {
    return false
  }

  if (!is(search)) {
    return false
  }

  return input.indexOf(search) === 0
}

/**
 * Test if string starts with substring
 *
 * @param {string|any}   search
 * @param {string|array} source
 *
 * @returns {boolean}
 *
 * @name startsWith
 * @tag String
 * @signature (search: string|any) => (source: string|Array): boolean
 *
 * @example
 * startsWith("lorem", "lorem ipsum")
 * // => true
 *
 * startsWith("lorem", ["lorem", "ipsum"])
 * // => true
 *
 * startsWith("dolor")("lorem ipsum")
 * // false
 */
export const startsWith = curry(_startsWith)
