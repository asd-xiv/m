/**
 * Performs left-to-right function composition. The leftmost function may have
 * any arity, the remaining functions must be unary.
 *
 * @param {Function}   firstFn  First function in transform chain
 * @param {Function[]} restFn   Remaining functions
 * @param {Array}      source First function arguments
 *
 * @returns {Any}
 *
 * @name pipe
 * @tag Core
 * @signature (...fn: Function[]) => (...source: Array): Any
 *
 * @see {@link pipeP}
 *
 * @example
 * pipe(inc, inc)(2)
 * // => 4
 */
export const pipe = (firstFn, ...restFn) => (...source) => {
  let acc = firstFn(...source)

  for (let index = 0, length = restFn.length; index < length; index++) {
    acc = restFn[index](acc)
  }

  return acc
}
