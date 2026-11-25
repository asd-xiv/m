import { isPlainObject } from "../is/is.js"
import { type } from "../type/type.js"

type TrimOptions = { chars?: string }

type TrimFn = {
  // Step: options now, text later
  (options: TrimOptions): (text: string) => string

  // Options and text together
  (options: TrimOptions, text: string): string

  // Whitespace from both ends of text. Last, so `map(trim, texts)` picks it
  (text: string): string
}

const _trim = (chars: string | undefined, text: unknown): string => {
  if (typeof text !== "string") {
    throw new TypeError(
      `@asd14/m/trim: expected 'text' to be 'String', got '${type(text)}'`
    )
  }

  if (chars === undefined) return text.trim()

  // Code points, so a character outside the BMP is one member of the set
  const set = new Set<string>()
  const points: string[] = []

  for (const char of chars) set.add(char)
  for (const char of text) points.push(char)
  let start = 0
  let end = points.length

  while (start < end && set.has(points[start]!)) start++
  while (end > start && set.has(points[end - 1]!)) end--

  return points.slice(start, end).join("")
}

const _getChars = (options: unknown): string | undefined => {
  if (!isPlainObject(options)) {
    throw new TypeError(
      `@asd14/m/trim: expected 'options' to be 'Object', got '${type(options)}'`
    )
  }

  const { chars } = options

  if (chars !== undefined && typeof chars !== "string") {
    throw new TypeError(
      `@asd14/m/trim: expected 'options.chars' to be 'String', got '${type(chars)}'`
    )
  }

  return chars
}

/**
 * Remove whitespace, or the characters of `chars`, from the beginning and end
 * of a string.
 *
 * Input is never mutated - always returns a new string.
 *
 * `chars` is a set, as in Python's `str.strip` and lodash's `trim`: each of its
 * characters is removed from both ends, in any order. Without `chars`, the
 * whitespace goes, as `String.prototype.trim`.
 *
 * With one argument, a string is the text and a plain object is the options,
 * which return a step for `pipe` or `map`.
 *
 * @param {Object} [options] - { chars?: string }, characters to remove
 * @param {string} text - String to trim
 *
 * @returns {string} Trimmed string
 *
 * @example
 * trim("\n lorem \t")
 * // => "lorem"
 *
 * map(trim, ["  a  ", " b"])
 * // => ["a", "b"]
 *
 * trim({ chars: "\t" }, "\t lorem \t")
 * // => " lorem "
 *
 * trim({}, " a ")
 * // => "a"
 *
 * pipe(read("path"), trim({ chars: "/" }))({ path: "/usr/local/" })
 * // => "usr/local"
 *
 * @name trim
 * @tag String
 */
const trim = ((...params: unknown[]) => {
  // @signature (text) or (options)
  if (params.length <= 1) {
    const input = params[0]

    if (typeof input === "string") return _trim(undefined, input)

    if (isPlainObject(input)) {
      const chars = _getChars(input)

      return (text: unknown) => _trim(chars, text)
    }

    throw new TypeError(
      `@asd14/m/trim: expected 'input' to be 'String' or 'Object', got '${type(input)}'`
    )
  }

  // @signature (options, text)
  return _trim(_getChars(params[0]), params[1])
}) as TrimFn

export { trim }
export type { TrimFn, TrimOptions }
