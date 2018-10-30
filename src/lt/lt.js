/**
 * Less compare
 *
 * @param  {number}  first   First number
 * @param  {number}  second  Second number
 *
 * @return {boolean}
 *
 * @tag Core
 * @signarute (first: number) => (second: number): boolean
 *
 * @example
 * lt(4)(10)
 * // => true
 * lt(14)(10)
 * // => false
 */
module.exports = first => second => first < second
