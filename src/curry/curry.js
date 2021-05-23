/**
 * Partially apply a function
 *
 * @signature (...params: mixed[]): Function|any
 *
 * @param {Function} fn     The function to apply
 * @param {any}      params The arguments to apply, in order
 *
 * @returns {Function|any} If the number of arguments provided is sufficient
 * to call the function, call the function and return the result. Otherwise,
 * return a new function which takes additional parameters, returning the result
 * of calling `curry` on the function with the provided parameters.
 *
 * @example
 * const sum = (a, b) => a + b
 *
 * curry(sum)(1)(2) = 3
 */
export const curry =
  fn =>
  (...params) => {
    const _params = params.length === 0 ? [undefined] : params

    return _params.length >= fn.length
      ? fn(..._params)
      : (...rest) =>
          curry(fn)(..._params, ...(rest.length === 0 ? [undefined] : rest))
  }
