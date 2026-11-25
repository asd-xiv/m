import { type } from "../type/type.js"

type SplitFn = {
  (separator: string | RegExp, input: string): string[]
  (separator: string | RegExp): (input: string) => string[]
}

const _split = (separator: string | RegExp, input: string): string[] => {
  if (typeof input !== "string") {
    throw new TypeError(
      `@asd14/m/split: expected 'input' to be 'String', got '${type(input)}'`
    )
  }

  return input.split(separator)
}

/**
 * Split a string into an array of substrings using a separator.
 *
 * Input is never mutated - always returns a new array.
 *
 * @param {string|RegExp} separator - Delimiter to split on
 * @param {string} input - String to split
 *
 * @returns {Array} Array of substrings
 *
 * @example
 * split(",", "a,b,c")
 * // => ["a", "b", "c"]
 *
 * split(/[,-]/)("foo,bar-baz")
 * // => ["foo", "bar", "baz"]
 *
 * // In a pipe - extract path segments
 * pipe(split("/"), filter(segment => segment !== ""))("/usr/local/bin")
 * // => ["usr", "local", "bin"]
 *
 * @name split
 * @tag String
 *
 * @see {@link join}
 */
const split = ((...params: unknown[]) => {
  const separator = params[0]

  if (typeof separator !== "string" && !(separator instanceof RegExp)) {
    throw new TypeError(
      `@asd14/m/split: expected 'separator' to be 'String' or 'RegExp', got '${type(separator)}'`
    )
  }

  // @signature (separator) => (input)
  if (params.length === 1) {
    return (input: string) => _split(separator, input)
  }

  // @signature (separator, input)
  return _split(separator, params[1] as string)
}) as SplitFn

export { split }
export type { SplitFn }
