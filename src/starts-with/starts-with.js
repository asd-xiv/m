import { curry } from "../curry/curry"

const _startsWith = (search, source) => {
  const searchPosition = source.indexOf(search)

  if (searchPosition === -1) {
    return false
  }

  return searchPosition === 0
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
