/**
 * Performs left-to-right function composition. The leftmost function may have
 * any arity, the remaining functions must be unary.
 *
 * Functions can return a Promise, behaving like Promise.sequence.
 *
 * @param {Function}   firstFn First function in chain
 * @param {Function[]} restFn  Remaining bottom functions
 * @param {any}        input   First function arguments
 *
 * @returns {Promise<any>}
 *
 * @name pipeP
 * @tag Promise
 * @signature (...fn: Function[]) => (...input): Promise<any>
 *
 * @see {@link pipe}
 *
 * @example
 * const inc = input => input + 1
 * const incP = input => Promise.resolve(input + 1)
 *
 * pipeP(incP, inc)(2).then(result => {
 *   // => result = 4
 * })
 */
const pipeP =
  (firstFn, ...restFn) =>
  (...input) => {
    let acc = Promise.resolve(firstFn(...input))

    for (let index = 0, length = restFn.length; index < length; index++) {
      acc = acc.then(result => restFn[index](result))
    }

    return acc
  }

export { pipeP }
