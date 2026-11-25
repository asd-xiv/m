import { type } from "../../type/type.js"

type EscapeRegExpFn = (input: string) => string

const REG_EXP_SPECIAL = /[$()*+\-.?[\\\]^{|}]/g

/**
 * Escape regular expression special characters in a string so it can be
 * safely used inside a `RegExp` constructor, also in a character class
 * and with the `u` flag.
 *
 * Input is never mutated - always returns a new string.
 *
 * @param {string} input - String to escape
 *
 * @returns {string} String with RegExp special characters escaped
 *
 * @example
 * escapeRegExp("lorem. ipsum [dolor]")
 * // => "lorem\\. ipsum \\[dolor\\]"
 *
 * escapeRegExp("price is $9.99")
 * // => "price is \\$9\\.99"
 *
 * new RegExp(`[${escapeRegExp("a-z")}]`).test("b")
 * // => false
 *
 * @name escapeRegExp
 * @tag String
 *
 * @see {@link escapeHTML}
 */
const escapeRegExp: EscapeRegExpFn = (input: string): string => {
  if (typeof input !== "string") {
    throw new TypeError(
      `@asd14/m/escapeRegExp: expected 'input' to be 'String', got '${type(input)}'`
    )
  }

  return input.replace(REG_EXP_SPECIAL, "\\$&")
}

export { escapeRegExp }
export type { EscapeRegExpFn }
