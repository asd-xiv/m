/**
 * Check if a is equal to b (strict equality)
 *
 * @param  {mixed}  one  First value
 * @param  {mixed}  two  Second value
 *
 * @return  {boolean}
 *
 * @tag Core
 * @signature (a: mixed) => (b: mixed): boolean
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
export const isEqual = one => two =>
  Number.isNaN(one) && Number.isNaN(two) ? true : one === two
