import RFC3986 from "rfc-3986"

const URIRegExp = new RegExp(RFC3986.uri)

/**
 * Check if a string is a valid URI based on [RFC3986](https://tools.ietf.org/html/rfc3986)
 *
 * @param {string} input
 *
 * @returns {boolean}
 *
 * @name      isURI
 * @tag       Other
 * @signature (source: string): boolean
 *
 * @example
 * isURI("lorem")
 * // false
 *
 * isURI("http://www.ietf.org/rfc/rfc2396.txt")
 * // true
 */
export const isURI = input => URIRegExp.test(input)
