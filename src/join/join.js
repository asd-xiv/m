import { curry } from "../curry/curry"

const _join = (separator, source) => [].join.call(source, separator)

/**
 * Join all elements of an array into a string
 *
 * @tag Array
 * @signature (separator: String)(source: Array): String
 * @signature (separator: String, source: Array): String
 *
 * @param {string} separator Separator between each adjacent elements
 * @param {[]}     source    Source array
 *
 * @returns {string}
 *
 * @example
 * join(",")(["lorem", "ipsum"])
 * // => "lorem,ipsum"
 */
export const join = curry(_join)
