/**
 * Convert a value to its string representation.
 *
 * @param {unknown} input - Value to convert
 *
 * @returns {string} String representation of the input
 *
 * @example
 * toString(42)
 * // => "42"
 *
 * toString(null)
 * // => "null"
 *
 * map(toString, [1, 2, 3])
 * // => ["1", "2", "3"]
 *
 * pipe(
 *   map(toString),
 *   join(", ")
 * )([1, 2, 3])
 * // => "1, 2, 3"
 *
 * @name toString
 * @tag String
 */
const toString = (input: unknown): string => String(input)

export { toString }
