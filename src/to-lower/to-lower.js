/**
 * Convert string to lower case
 *
 * @param {string} source
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
export const toLower = source => "".toLowerCase.call(source)
