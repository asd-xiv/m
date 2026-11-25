import { isNothing } from "../is/is.js"

type DefaultToFn = {
  <T>(defaultValue: T, input: T | null | undefined): T
  <T>(defaultValue: T): (input: T | null | undefined) => T
}

/**
 * Return the input value if it is something (not null, undefined, or NaN),
 * otherwise return the default value.
 *
 * @param {unknown} defaultValue - Value to return when input is nothing
 * @param {unknown} input - Value to test
 *
 * @returns {unknown} The input if something, otherwise the default
 *
 * @example
 * defaultTo(0, null)
 * // => 0
 *
 * defaultTo(0, undefined)
 * // => 0
 *
 * defaultTo(0, NaN)
 * // => 0
 *
 * defaultTo(0, 42)
 * // => 42
 *
 * defaultTo(42, 0)
 * // => 0 (zero is not nothing)
 *
 * defaultTo("42", "")
 * // => "" (an empty string is not nothing)
 *
 * defaultTo(0)(null)
 * // => 0
 *
 * pipe(find(isEven), defaultTo(0))([1, 3, 5])
 * // => 0
 *
 * @name defaultTo
 * @tag Any value
 */
const defaultTo = ((...params: unknown[]) => {
  // @signature (defaultValue) => (input)
  if (params.length === 1) {
    return (input: unknown) => (isNothing(input) ? params[0] : input)
  }

  // @signature (defaultValue, input)
  return isNothing(params[1]) ? params[0] : params[1]
}) as DefaultToFn

export { defaultTo }
export type { DefaultToFn }
