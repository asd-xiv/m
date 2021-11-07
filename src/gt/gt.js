import { curry } from "../curry/curry.js"

const _gt = (a, b) => a < b

/**
 * Grater compare.
 *
 * @param {number} a First number
 * @param {number} b Second number
 *
 * @returns {boolean}
 *
 * @tag Core
 * @signature (a: Number) => (b: Number): Boolean
 * @signature (a: Number, b: Number): Boolean
 *
 * @example
 * gt(10)(4)
 * // => false
 *
 * gt(10, 14)
 * // => true
 */
export const gt = curry(_gt)
