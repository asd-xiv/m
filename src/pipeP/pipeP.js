import { reduce } from "../reduce/reduce"

/**
 * Performs left-to-right function composition. The leftmost function may have
 * any arity, the remaining functions must be unary.
 *
 * Functions can return a Promise, behaving like Promise.sequence.
 *
 * @name       pipeP
 * @tag        Promise
 * @signature  (...fn) => (...input): any
 * @see        {@link pipe}
 *
 * @param  {Array}  fn     Promise chain, in order with the input of previous
 *                         one's result
 * @param  {Array}  input  First function's arguments
 *
 * @returns  {any}
 *
 * @example
 * const inc = input => input + 1
 * const incP = input => Promise.resolve(input + 1)
 *
 * pipeP(incP, inc)(2).then(result => {
 *   // => result = 4
 * })
 */
const pipeP = (first, ...rest) => (...input) =>
  reduce(
    (acc, item) => acc.then(result => item(result)),
    Promise.resolve(first.apply(null, input))
  )(rest)

export { pipeP }
