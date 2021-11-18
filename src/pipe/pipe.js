/**
 * Performs left-to-right function composition. The leftmost function may have
 * any arity, the remaining functions must be unary.
 *
 * @param {Function}   firstFn First function in transform chain
 * @param {Function[]} restFn  Remaining functions
 * @param {Array}      input   First function arguments
 *
 * @returns {any}
 *
 * @name pipe
 * @tag Core
 * @signature (...fn: Function[]) => (...input: Array): any
 *
 * @see {@link pipeP}
 *
 * @example
 * pipe(inc, inc)(2)
 * // => 4
 */
export const pipe =
  (firstFn, ...restFn) =>
  (...input) => {
    let acc = firstFn(...input)

    for (let index = 0, length = restFn.length; index < length; index++) {
      acc = restFn[index](acc)
    }

    return acc
  }
