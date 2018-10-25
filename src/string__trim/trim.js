const escapeRegExp = require("../string__escapeRegExp/escapeRegExp")

/**
 * Remove char from beginning and end of string
 *
 * @param  {string}  char    Character to be removed
 * @param  {string}  source  Source string
 *
 * @return {string}
 *
 * @tag String
 * @signature (char: string) => (source: string): string
 *
 * @example
 * trim()(" lorem  ")
 * // => "lorem"
 * trim("-")("-- lorem  --")
 * // => " lorem  "
 */
module.exports = (char = " ") => source => {
  const safeChar = escapeRegExp(char)

  return source.replace(new RegExp(`^[${safeChar}]+|[${safeChar}]+$`, "g"), "")
}
