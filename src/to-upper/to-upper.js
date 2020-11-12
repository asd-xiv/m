/**
 * Convert string to upper case
 *
 * @tag String
 * @signature (source: string): string
 *
 * @param {string} source Source string
 *
 * @returns {string}
 *
 * @example
 * toUpper("Lorem Ipsum")
 * // "LOREM IPSUM"
 */
export const toUpper = source => "".toUpperCase.call(source)
