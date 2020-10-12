/**
 * Partially apply a function
 *
 * @signature (...args: mixed[]): Function|mixed
 *
 * @param {Function}  fn    The function to apply
 * @param {any}       args  The arguments to apply, in order
 *
 * @return  {Function|mixed}  If the number of arguments provided is sufficient
 * to call the function, call the function and return the result. Otherwise,
 * return a new function which takes additional parameters, returning the result
 * of calling `curry` on the function with the provided parameters.
 *
 * @example
 * const sum = (a, b) => a + b
 *
 * curry(sum)(1)(2) = 3
 */
export const curry = fn => (...args) =>
  args.length >= fn.length
    ? fn(...args)
    : (...rest) => curry(fn)(...args, ...rest)
