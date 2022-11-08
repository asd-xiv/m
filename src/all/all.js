import { pipe } from "../pipe/pipe.js"

/**
 * Test if all elements of array satisfy a predicate function or a chain of
 * predicates.
 *
 * @name all
 * @tag Array
 * @signature <T>(fn: Predicate<T>|PredicatePipe<T>[], input: T[]): boolean
 * @signature <T>(fn: Predicate<T>|PredicatePipe<T>[]): (input: T[]): boolean
 *
 * @see {@link allWith}
 * @see {@link any}
 * @see {@link anyWith}
 *
 * @example
 * all(isNumber)([1, 2, 3])
 * // => true
 *
 * all(is, [1, "asd", null])
 * // => false
 *
 * all([read("id"), isNumber], [{ id: 0 }, { id: 1 }, { id: 2 }])
 * // => true
 */
export const all = (...params) => {
  if (params.length <= 1) {
    return input => all(params[0], input)
  }

  const [_fn, _input] = params
  const input = Array.isArray(_input) ? _input : [_input]
  const fn = Array.isArray(_fn) ? pipe(..._fn) : _fn

  for (let i = 0, length = input.length; i < length; i++) {
    if (fn(input[i]) !== true) {
      return false
    }
  }

  return true
}
