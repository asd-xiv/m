/**
 * Less compare.
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
 * @signarute (first: number) => (second: number): boolean
 *
 * @example
 * lt(10)(4)
 * // => true
 * lt(10)(14)
 * // => false
 */
const lt = second => first => first < second

export { lt }
