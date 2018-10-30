/**
 * Grater compare
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
 * gt(4)(10)
 * // => false
 * gt(14)(10)
 * // => true
 */
module.exports = first => second => first > second
