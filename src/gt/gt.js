import { curry } from "../curry/curry"

const _gt = (a, b) => a < b

/**
 * Grater compare.
 *
 * @param {Number} a First number
 * @param {Number} b Second number
 *
 * @return {Boolean}
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
