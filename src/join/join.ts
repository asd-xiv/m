import { type } from "../type/type.js"

type JoinFn = {
  (separator: string, input: readonly string[]): string
  (separator: string): (input: readonly string[]) => string
}

const _join = (separator: string, input: readonly string[]): string => {
  if (!Array.isArray(input)) {
    throw new TypeError(
      `@asd14/m/join: expected 'input' to be 'Array', got '${type(input)}'`
    )
  }

  return input.join(separator)
}

/**
 * Join an array of strings into a single string using a separator.
 *
 * Input is never mutated - always returns a new string.
 *
 * @param {string} separator - String to place between elements
 * @param {Array} input - Array of strings to join
 *
 * @returns {string} Joined string
 *
 * @example
 * join(",", ["a", "b", "c"])
 * // => "a,b,c"
 *
 * join("-")(["foo", "bar"])
 * // => "foo-bar"
 *
 * // In a pipe - rename a file path
 * pipe(split("/"), dropLast, push("new-name"), join("/"))("/usr/local/bin")
 * // => "/usr/local/new-name"
 *
 * @name join
 * @tag String
 *
 * @see {@link split}
 */
const join = ((...params: unknown[]) => {
  const separator = params[0]

  if (typeof separator !== "string") {
    throw new TypeError(
      `@asd14/m/join: expected 'separator' to be 'String', got '${type(separator)}'`
    )
  }

  // @signature (separator) => (input)
  if (params.length === 1) {
    return (input: readonly string[]) => _join(separator, input)
  }

  // @signature (separator, input)
  return _join(separator, params[1] as readonly string[])
}) as JoinFn

export { join }
export type { JoinFn }
