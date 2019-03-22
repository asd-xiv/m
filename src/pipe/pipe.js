/**
 * Performs left-to-right function composition. The leftmost function may have
 * any arity, the remaining functions must be unary.
 *
 * @param  {Function}    first   First function in chain
 * @param  {Function[]}  rest    Remaining bottom functions
 * @param  {Array}       source  First function arguments
 *
 * @return  {any}
 *
 * @example
 * pipe(inc, inc)(2)
 * // => 4
 */
const pipe = (first, ...rest) => (...source) => {
  let acc = first.apply(null, source)

  for (let i = 0, length = rest.length; i < length; i++) {
    acc = rest[i](acc, source[i], i, source)
  }

  return acc
}

export { pipe }
