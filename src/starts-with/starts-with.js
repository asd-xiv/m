/**
 * Test if string starts with substring
 *
 * @param  {string}  search  Search string
 * @param  {string}  source  Source string
 *
 * @return {boolean}
 *
 * @tag String
 * @signature (search: string) => (source: string): boolean
 *
 * @example
 * startsWith("lorem")("lorem ipsum")
 * // => true
 */
const startsWith = search => source => {
  if (search.length > source.length) {
    return false
  }

  const searchPosition = source.indexOf(search)

  if (searchPosition === -1) {
    return false
  }

  return searchPosition === 0
}

export { startsWith }
