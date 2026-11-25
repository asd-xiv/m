import { type } from "../../type/type.js"

type EscapeHTMLFn = (input: string) => string

const CHAR_MAP: Record<string, string> = {
  '"': "&quot;",
  "&": "&amp;",
  "'": "&#39;",
  "/": "&#47;",
  "<": "&lt;",
  ">": "&gt;",
}

const HTML_SPECIAL = /["&'/<>]/g

/**
 * Escape HTML special characters in a string so it can be safely embedded
 * in an HTML document without being interpreted as markup.
 *
 * Input is never mutated - always returns a new string.
 *
 * @param {string} input - String to escape
 *
 * @returns {string} String with HTML special characters escaped
 *
 * @example
 * escapeHTML("<b>bold</b>")
 * // => "&lt;b&gt;bold&lt;&#47;b&gt;"
 *
 * escapeHTML("Tom & Jerry")
 * // => "Tom &amp; Jerry"
 *
 * @name escapeHTML
 * @tag String
 *
 * @see {@link escapeRegExp}
 */
const escapeHTML: EscapeHTMLFn = (input: string): string => {
  if (typeof input !== "string") {
    throw new TypeError(
      `@asd14/m/escapeHTML: expected 'input' to be 'String', got '${type(input)}'`
    )
  }

  return input.replace(HTML_SPECIAL, char => CHAR_MAP[char] as string)
}

export { escapeHTML }
export type { EscapeHTMLFn }
