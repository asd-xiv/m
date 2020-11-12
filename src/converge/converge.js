import { pipe } from "../pipe/pipe"

const _converge = (_accFn, _extractFn, ...source) => {
  const accFn = Array.isArray(_accFn) ? pipe(..._accFn) : _accFn
  const extractFn = Array.isArray(_extractFn) ? _extractFn : [_extractFn]
  const extractValues = []

  for (
    let i = 0, extractFnLength = extractFn.length;
    i < extractFnLength;
    ++i
  ) {
    extractValues.push(extractFn[i](...source))
  }

  return accFn(...extractValues)
}

/**
 * Apply a list of function (extract functions) on the same input and use
 * the results as parameters for a final accumulator function.
 *
 * @param {Fn|Fn[]} accFn     Accumulator or final aggreate function
 * @param {Fn|Fn[]} extractFn List of functions to be applied on input
 * @param {Any}     ...source Source input
 * @param {...any}  params    Function params
 *
 * @returns {Any}
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
    return (...source) => _converge(params[0], params[1], ...source)
  }

  // @signature (accFn, extractFn, source)
  return _converge(...params)
}
