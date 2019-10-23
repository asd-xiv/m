/**
 * Grater compare.
 *
 * Since this will mostly be used in pipe, the first param in the curry chain
 * is the second operand.
 *
 * @param  {number}  second  Second number
 * @param  {number}  first   First number
 *
 * @return {boolean}
 *
 * @tag Core
 * @signarute (second: number) => (first: number): boolean
 *
 * @example
 * gt(10)(4)
 * // => false
 * gt(10)(14)
 * // => true
 */
const gt = second => first => first > second

export { gt }
