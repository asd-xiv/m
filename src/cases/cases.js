import { when } from "../when/when"
import { i } from "../i/i"

/**
 * Functional case statement.
 *
 * @param {Array<Function, Function>} conditions    List of 2-tuples of functions (if, then)
 * @param {Function}                  [otherwise=i] Function to call if no condition matches, Defaults to identity.
 * @param {any}                       source        Value to check
 *
 * @returns {any}
 * The result of calling the first matching then function or the
 * otherwise function on the input.
 *
 * @name cases
 * @tag Core
 *
 * @see {@link when}
 *
 * @example
 * cases([
 *  [x === 0, x => x * 2],
 *  [x === 1, x => x],
 * ], x => x + 1)(2)
 * // => 3
 */
export const cases = ([[conditionFn, thenFn], ...rest], otherwise = i) =>
  when(
    conditionFn,
    thenFn,
    rest.length === 0 ? otherwise : cases(rest, otherwise)
  )
