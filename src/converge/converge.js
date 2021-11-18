import { pipe } from "../pipe/pipe.js"

const _converge = (_accFn, _extractFn, ...input) => {
  const accFn = Array.isArray(_accFn) ? pipe(..._accFn) : _accFn
  const extractFn = Array.isArray(_extractFn) ? _extractFn : [_extractFn]
  const extractValues = []

  for (
    let i = 0, extractFnLength = extractFn.length;
    i < extractFnLength;
    ++i
  ) {
    extractValues.push(extractFn[i](...input))
  }

  return accFn(...extractValues)
}

/**
 * Apply a list of function (extract functions) on the same input and use
 * the results as parameters for a final accumulator function.
 *
 * @param {Function|Function[]} accFn     Accumulator or final aggreate function
 * @param {Function|Function[]} extractFn Functions to be applied on input
 * @param {any}                 ...source Source input
 * @param {...any}              params    Function params
 *
 * @returns {any}
 *
 * @name converge
 * @tag Core
 * @signature (accFn: Fn|Fn[], extractFn: Fn|Fn[]) => (...source: Array): Any
 * @signature (accFn: Fn|Fn[], extractFn: Fn|Fn[], ...source: Array): Any
 *
 * @example
 *
 * const divide = () => {}
 * const sum = () => {}
 * const count = () => {}
 *
 * converge(divide, [sum, count], [1, 2, 3, 4, 5, 6, 7])
 * // => 4
 */
export const converge = (...params) => {
  // @signature (accFn, extractFn) => (source)
  if (params.length <= 2) {
    return (...input) => _converge(params[0], params[1], ...input)
  }

  // @signature (accFn, extractFn, source)
  return _converge(...params)
}
