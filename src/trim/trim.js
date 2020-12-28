import { escapeRegExp } from "../escape-reg-exp/escape-reg-exp"

const _trim = (char = " ", source) => {
  const safeChar = escapeRegExp(char)

  return source.replace(new RegExp(`^[${safeChar}]+|[${safeChar}]+$`, "g"), "")
}

/**
 * Remove char from beginning and end of string
 *
 * @param {string} char   Character to be removed
 * @param {string} source Source string
 * @param {...any} params Function params
 *
 * @returns {string}
 *
 * @tag String
 * @signature (char: String) => (source: String): String
 * @signature (char: String, source: String): String
 *
 * @example
 * trim()(" lorem  ")
 * // => "lorem"
 *
 * trim("-", "-- lorem  -")
 * // => " lorem  "
 */
const trim = (...params) => {
  // @signature (char) => (source)
  if (params.length <= 1) {
    return source => _trim(params[0], source)
  }

  // @signature (char, source)
  return _trim(...params)
}

export { trim }
