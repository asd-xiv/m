import { _toFunction } from "./to-function.js"
import { isPlainObject } from "../is/is.js"
import { isEqual } from "../is-equal/is-equal.js"
import { type } from "../type/type.js"

type BuildMatchOptions = {
  /** The public function to name in the error, eg. `filterWith` */
  fnName: string
  /** The input to name in the error: `input`, or `input[*]` for an item */
  inputName: string
}

type MatchEntry = [
  key: string,
  shouldBe: unknown,
  isFunction: boolean,
  isNegated: boolean,
]

/**
 * Check a matcher once, and build the predicate that tests an object against
 * it. A function or a pipe array passes when it returns `true`. A plain value
 * passes when it equals the key's value, compared with SameValueZero. A `!`
 * before a key negates its test. Reads only the object's own keys.
 *
 * @throws {TypeError} When the matcher is not a plain object
 * @example
 * const isActiveAdmin = _buildMatch(
 *   { role: "admin", "!deletedAt": isSomething },
 *   { fnName: "filterWith", inputName: "input[*]" }
 * )
 *
 * isActiveAdmin({ role: "admin" })
 * // => true
 */
const _buildMatch = (
  match: unknown,
  { fnName, inputName }: BuildMatchOptions
): ((input: unknown) => boolean) => {
  if (!isPlainObject(match)) {
    throw new TypeError(
      `@asd14/m/${fnName}: expected 'match' to be 'Object', got '${type(match)}'`
    )
  }

  const keys = Object.keys(match)
  const entries: MatchEntry[] = []

  for (let index = 0, length = keys.length; index < length; index++) {
    const key = keys[index]!
    const value = match[key]
    const isFunction = typeof value === "function" || Array.isArray(value)
    const isNegated = key[0] === "!"

    entries.push([
      isNegated ? key.slice(1) : key,
      isFunction
        ? _toFunction(value, { fnName, paramName: `match.${key}` })
        : value,
      isFunction,
      isNegated,
    ])
  }

  return input => {
    if (!isPlainObject(input)) {
      throw new TypeError(
        `@asd14/m/${fnName}: expected '${inputName}' to be 'Object', got '${type(input)}'`
      )
    }

    for (let index = 0, length = entries.length; index < length; index++) {
      const [key, shouldBe, isFunction, isNegated] = entries[index]!
      const value = Object.hasOwn(input, key) ? input[key] : undefined
      const isMatched = isFunction
        ? (shouldBe as (value: unknown) => unknown)(value) === true
        : isEqual(shouldBe, value)

      if (isMatched === isNegated) {
        return false
      }
    }

    return true
  }
}

export { _buildMatch }
export type { BuildMatchOptions }
