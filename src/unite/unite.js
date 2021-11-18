import { curry } from "../curry/curry.js"

const _unite = (separator, input) => Array.prototype.join.call(input, separator)

/**
 * Unite all elements of an array into a string
 *
 * @param {string} separator Separator between each adjacent elements
 * @param {Array}  source    Source array
 *
 * @returns {string}
 *
 * @name unite
 * @tag Array
 * @signature (separator: String, source: Array) => String
 *
 * @example
 * unite(",", ["lorem", "ipsum"])
 * // => "lorem,ipsum"
 */
export const unite = curry(_unite)
