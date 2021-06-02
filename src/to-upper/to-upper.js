/**
 * Convert string to upper case
 *
 * @param {string} source
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
export const toUpper = source => String.prototype.toUpperCase.call(source)
