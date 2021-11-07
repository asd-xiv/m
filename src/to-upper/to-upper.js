/**
 * Convert string to upper case
 *
 * @param {string} input
 *
 * @returns {string}
 *
 * @name toUpper
 * @tag String
 * @signature (source: string): string
 *
 * @see {@link toLower}
 *
 * @example
 * toUpper("Lorem Ipsum")
 * // "LOREM IPSUM"
 */
export const toUpper = input => String.prototype.toUpperCase.call(input)
