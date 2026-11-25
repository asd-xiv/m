import type { PlainObject } from "../../../types/object.js"
import type { Matcher } from "../../../types/object.matcher.js"
import { isPlainObject } from "../../is/is.js"
import { type } from "../../type/type.js"
import { _buildMatch } from "../../utils/build-match.js"

type UpsertWithFn = {
  // Uncurried
  <T extends PlainObject>(match: Matcher<T>, item: T, input: readonly T[]): T[]

  // Curried
  <T extends PlainObject>(
    match: Matcher<T>,
    item: T
  ): (input: readonly T[]) => T[]
}

const _upsertWith = (
  predicate: (input: unknown) => boolean,
  item: PlainObject,
  input: unknown
): unknown[] => {
  if (!Array.isArray(input)) {
    throw new TypeError(
      `@asd14/m/upsertWith: expected 'input' to be 'Array', got '${type(input)}'`
    )
  }

  const items: unknown[] = input
  const result = [...items]

  for (let i = 0, length = result.length; i < length; i++) {
    if (predicate(result[i])) {
      result[i] = { ...(result[i] as PlainObject), ...item }

      return result
    }
  }

  result.push(item)

  return result
}

/**
 * Replace the first object of an array that satisfies `match` with `item`, or
 * append `item` when none does. A match becomes `{ ...found, ...item }`: a key
 * that the found object has and `item` lacks stays.
 *
 * Only the first match is replaced. `item` is a full object, never a patcher:
 * a function in it is a plain value. To transform a found item, use
 * `updateWith`.
 *
 * A `match` key maps to a value compared with SameValueZero, to a predicate
 * that must return `true`, or to a pipe array ending in a predicate. Prefix a
 * key with `!` to negate it. To match an array value, use a predicate.
 *
 * Input is never mutated - always returns a new array.
 *
 * @param {Object} match - Map of keys to values, predicates or pipe arrays
 * @param {Object} item - Full item to append or merge over the found one
 * @param {Array} input - Array of objects to search
 *
 * @returns {Array} New array, with one item replaced or appended
 *
 * @throws {TypeError} If `match` or `item` is not an Object, the input is not
 * an Array or an input item is not an Object
 *
 * @example
 * const items = [{ id: 1, name: "a" }]
 *
 * upsertWith({ id: 2 }, { id: 2, name: "b" }, items)
 * // => [{ id: 1, name: "a" }, { id: 2, name: "b" }]
 *
 * upsertWith({ id: 1 }, { id: 1, name: "b" }, items)
 * // => [{ id: 1, name: "b" }]
 *
 * upsertWith({ id: 1 }, { id: 1, name: "b" })(items)
 * // => [{ id: 1, name: "b" }]
 *
 * pipe(
 *   upsertWith({ id: 1 }, { id: 1, count: 1 }),
 *   map(read("count"))
 * )([{ id: 1, count: 0 }])
 * // => [1]
 *
 * @name upsertWith
 * @tag Array
 *
 * @see {@link updateWith}, for a transform of a found item
 * @see {@link update}
 */
const upsertWith = ((...params: unknown[]) => {
  const predicate = _buildMatch(params[0], {
    fnName: "upsertWith",
    inputName: "input[*]",
  })
  const item = params[1]

  if (!isPlainObject(item)) {
    throw new TypeError(
      `@asd14/m/upsertWith: expected 'item' to be 'Object', got '${type(item)}'`
    )
  }

  // @signature (match, item) => (input)
  if (params.length === 2) {
    return (input: unknown) => _upsertWith(predicate, item, input)
  }

  // @signature (match, item, input)
  return _upsertWith(predicate, item, params[2])
}) as UpsertWithFn

export { upsertWith }
export type { UpsertWithFn }
