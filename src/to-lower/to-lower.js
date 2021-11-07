/**
 * Convert string to lower case
 *
 * @param {string} input
 *
 * @returns {string}
 *
 * @name toLower
 * @tag String
 * @signature (source: string): string
 *
 * @see {@link toUpper}
 *
 * @example
 * toLower("Lorem Ipsum")
 * // "lorem ipsum"
 */
export const toLower = input => String.prototype.toLowerCase.call(input)
