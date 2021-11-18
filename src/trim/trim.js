/* eslint-disable jsdoc/check-param-names,jsdoc/require-param */

import { escapeRegExp } from "../escape-reg-exp/escape-reg-exp.js"

const _trim = (char = " ", input) => {
  const safeChar = escapeRegExp(char)

  return input.replace(new RegExp(`^[${safeChar}]+|[${safeChar}]+$`, "g"), "")
}

/**
 * Remove char from beginning and end of string
 *
 * @param {string} char   Character to be removed
 * @param {string} source Source string
 *
 * @returns {string}
 *
 * @tag String
 * @signature (char: string) => (source: string): string
 * @signature (char: string, source: string): string
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
    return input => _trim(params[0], input)
  }

  // @signature (char, source)
  return _trim(...params)
}

export { trim }
