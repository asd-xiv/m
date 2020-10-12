import { curry } from "../curry/curry"

const _isEqual = (a, b) => (Number.isNaN(a) && Number.isNaN(b) ? true : a === b)

/**
 * Check if a tripple-equals b (accounts for null, undefined and NaN)
 *
 * @param {Mixed} a First value
 * @param {Mixed} b Second value
 *
 * @return {Boolean}
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
