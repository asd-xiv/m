import { type } from "../type/type.js"

const _push = <E, T>(
  elements: readonly E[],
  input: readonly T[]
): (T | E)[] => {
  if (!Array.isArray(input)) {
    throw new TypeError(
      `@asd14/m/push: expected 'input' to be 'Array', got '${type(input)}'`
    )
  }

  return [...(input as readonly T[]), ...elements]
}

/**
 * Add elements at the end of an array. Always curried - takes the elements
 * to push and returns a function expecting the array.
 *
 * Input is never mutated - always returns a new array.
 *
 * @param {unknown} elements - One or more elements to append
 *
 * @returns {Function} A function that takes an array and returns a new array with elements appended
 *
 * @example
 * push(4)([1, 2, 3])
 * // => [1, 2, 3, 4]
 *
 * push(4, 5)([1, 2, 3])
 * // => [1, 2, 3, 4, 5]
 *
 * // In a pipe - rename a file path
 * pipe(split("/"), dropLast, push("new-name"), join("/"))("/usr/local/bin")
 * // => "/usr/local/new-name"
 *
 * @name push
 * @tag Array
 *
 * @see {@link dropLast}
 */
const push =
  <E>(...elements: E[]) =>
  // @signature (...elements) => (input)
  <T>(input: readonly T[]): (T | E)[] =>
    _push(elements, input)

export { push }
