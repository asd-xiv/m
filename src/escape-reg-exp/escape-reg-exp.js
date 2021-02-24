import { escape } from "../escape/escape"

/**
 * Make safe for RegExp'ing
 *
 * @param {string} source Source string
 *
 * @returns {string}
 *
 * @tag String
 * @signature (source: string): string
 *
 * @example
 * escapeRegExp( "lorem. ipsum [dolor]" )
 * // => "lorem \\. ipsum \\[dolor\\]"
 */
export const escapeRegExp = escape(/[$()*+.<>?[\\\]^{|}]/g)
