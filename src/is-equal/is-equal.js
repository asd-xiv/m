import { curry } from "../curry/curry.js"

const _isEqual = (a, b) => (Number.isNaN(a) && Number.isNaN(b) ? true : a === b)

/**
 * Check if a tripple-equals b (accounts for null, undefined and NaN)
 *
 * @param {any} a First value
 * @param {any} b Second value
 *
 * @returns {boolean}
 *
 * @tag Core
 * @signature (a: Mixed) => (b: Mixed): Boolean
 * @signature (a: Mixed, b: Mixed): Boolean
 *
 * @example
 * equal(2)(2)
 * // => true
 *
 * equal("2")(2)
 * // => false
 *
 * equal(NaN)(NaN)
 * // => true
 *
 * equal([1])([1])
 * // => false
 */
export const isEqual = curry(_isEqual)
