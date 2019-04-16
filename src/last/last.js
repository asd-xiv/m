/**
 * Return last element in array
 *
 * @name      last
 * @tag       Array
 * @signature T[] => T
 * @see       head, top, tail
 *
 * @param {T[]}  source  Source array
 *
 * @returns {T}  Last element or undefined if empty source
 *
 * @example
 * last([1, 2, 3])
 * // 3
 *
 * last([])
 * // undefined
 */
const last = source => source[source.length - 1]

export { last }
