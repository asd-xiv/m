import { type } from "../../type/type.js"

type EscapeRegExpFn = (input: string) => string

const REG_EXP_SPECIAL = /[$()*+.?[\\\]^{|}]/g

// With the `v` flag, a doubled one of these is an operator inside a character
// class, eg. `&&`, and `\-` is valid only inside one. A backslash escape of
// them is invalid outside a class with `u`, so they get `\xNN`, which is valid
// in every mode
const V_FLAG_RESERVED = /[!#%&,\-/:;<=>@`~]/g

const _toHex = (char: string): string =>
  `\\x${char.charCodeAt(0).toString(16).padStart(2, "0")}`

/**
 * Escape regular expression special characters in a string so it can be
 * safely used inside a `RegExp` constructor: in a character class or outside
 * one, with no flag, the `u` flag or the `v` flag. The characters the `v` flag
 * reserves, eg. `&` and `,`, come back as `\xNN`.
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

  return input.replace(REG_EXP_SPECIAL, "\\$&").replace(V_FLAG_RESERVED, _toHex)
}

export { escapeRegExp }
export type { EscapeRegExpFn }
