import { curry } from "../curry/curry"

/**
 * Less compare.
 *
 * Since this will mostly be used in pipe, the first param in the curry chain
 * is the second operand.
 *
 * @param {number} second Second number
 * @param {number} first  First number
 *
 * @returns {boolean}
 *
 * @tag Core
 * @signarure (first: number) => (second: number): boolean
 * @signarure (first: number, second: number): boolean
 *
 * @example
 * lt(10)(4)
 * // => true
 * lt(10)(14)
 * // => false
 */
export const lt = curry((second, first) => first < second)
