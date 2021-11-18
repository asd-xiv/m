import checkFastDeepEqual from "fast-deep-equal"

/**
 * Determine if two variables are structurally equal
 *
 * @param {any}    a      Source input
 * @param {any}    b      Other source input
 * @param {...any} params
 *
 * @returns {boolean} True if inputs are structurally equal, false otherwise
 *
 * @name isDeepEqual
 * @tag Core
 * @signature (a: Any, b: Any): Boolean
 * @signature (a: Any)(b: Any): Boolean
 *
 * @see {@link clone}
 *
 * @example
 *
 * deepEqual(
 * {b: 3, a: 2},
 * {a: 2, b: 3}
 * )
 * // => true
 *
 * deepEqual(
 * {a :[1, 2]}
 * )(
 * {a: [2, 1]}
 * )
 * // => false
 */
export const isDeepEqual = (...params) => {
  // @signature (a) => (b)
  if (params.length <= 1) {
    return b => checkFastDeepEqual(params[0], b)
  }

  // @signature (a, b)
  return checkFastDeepEqual(...params)
}
