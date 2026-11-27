import { type } from "../type/type.js"

type EscapeFn = {
  (match: string | RegExp, input: string): string
  (match: string | RegExp): (input: string) => string
}

const _escape = (match: unknown, input: unknown): string => {
  if (typeof input !== "string") {
    throw new TypeError(
      `@asd14/m/escape: expected 'input' to be 'String', got '${type(input)}'`
    )
  }

  // A sticky (y) regex matches from its lastIndex, and replace leaves that
  // where the last match ended. A copy starts each call at 0, and keeps the
  // caller's regex as it was. A g regex is reset by replace, and a regex with
  // neither flag ignores lastIndex, so both are used as they are
  const pattern =
    match instanceof RegExp && match.sticky ? new RegExp(match) : match

  return input.replace(pattern as RegExp, "\\$&")
}

/**
 * Escape characters matched by a regular expression or a string in a string
 * by prefixing each match with a backslash. A string matches its first
 * occurrence only, use a RegExp with the `g` flag to escape every match.
 *
 * Input is never mutated - always returns a new string.
 *
 * @param {string|RegExp} match - Pattern or string to escape
 * @param {string} input - String to process
 *
 * @returns {string} String with matched characters backslash-escaped
 *
 * @example
 * escape(/[.]/g, "foo.bar")
 * // => "foo\\.bar"
 *
 * escape(/[+*]/g)("1+2*3")
 * // => "1\\+2\\*3"
 *
 * escape("-", "a-b-c")
 * // => "a\\-b-c"
 *
 * @name escape
 * @tag String
 *
 * @see {@link escapeHTML}
 * @see {@link escapeRegExp}
 */
const escape = ((...params: unknown[]) => {
  const match = params[0]

  if (typeof match !== "string" && !(match instanceof RegExp)) {
    throw new TypeError(
      `@asd14/m/escape: expected 'match' to be 'String' or 'RegExp', got '${type(match)}'`
    )
  }

  // @signature (match) => (input)
  if (params.length === 1) {
    return (input: unknown) => _escape(match, input)
  }

  // @signature (match, input)
  return _escape(match, params[1])
}) as EscapeFn

export { escape }
export type { EscapeFn }
