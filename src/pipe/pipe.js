/**
 * Performs left-to-right function composition. The leftmost function may have
 * any arity, the remaining functions must be unary.
 *
 * @param {Function}   first  First function in transform chain
 * @param {Function[]} rest   Remaining functions
 * @param {Array}      source First function arguments
 *
 * @returns {Any}
 *
 * @name pipe
 * @tag Core
 * @signature (...fn: Fn[]) => (...source: Array): Any
 *
 * @example
 * pipe(inc, inc)(2)
 * // => 4
 */
export const pipe = (first, ...rest) => (...source) => {
  let acc = first(...source)

  for (let i = 0, length = rest.length; i < length; i++) {
    acc = rest[i](acc, source[i], i, source)
  }

  return acc
}
