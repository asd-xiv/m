/**
 * Test if string ends with substring
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
 * endWith("ipsum")("lorem ipsum")
 * // => true
 */
module.exports = search => source => {
  if (search.length > source.length) {
    return false
  }

  const searchPosition = source.indexOf(search)

  if (searchPosition === -1) {
    return false
  }

  return searchPosition === source.length - search.length
}
