import type { PlainObject } from "../../../types/object.js"
import type { Matcher } from "../../../types/object.matcher.js"
import type { AnyPatcher, Patcher } from "../../../types/object.patcher.js"
import { type } from "../../type/type.js"
import { _buildMatch } from "../../utils/build-match.js"
import { _buildPatch } from "../../utils/build-patch.js"

type UpdateWithFn = {
  <T extends PlainObject>(
    match: Matcher<T>,
    patcher: Patcher<T>,
    input: readonly T[]
  ): T[]

  <T extends PlainObject>(
    match: Matcher<T>,
    patcher: AnyPatcher
  ): <U extends T>(input: readonly U[]) => U[]
}

const _updateWith = (
  predicate: (input: unknown) => boolean,
  patch: (input: unknown) => PlainObject,
  input: unknown
): unknown[] => {
  if (!Array.isArray(input)) {
    throw new TypeError(
      `@asd14/m/updateWith: expected 'input' to be 'Array', got '${type(input)}'`
    )
  }

  const result: unknown[] = []

  for (let i = 0, length = input.length; i < length; i++) {
    const item: unknown = input[i]

    result.push(predicate(item) ? patch(item) : item)
  }

  return result
}

/**
 * Apply {@link update} to the objects of an array that satisfy `match`.
 * The other items stay as they are. Each key in the patcher maps to a plain
 * value, a function `(currentValue, source) => newValue` or an array of
 * functions to pipe.
 *
 * A `match` key maps to a value compared with SameValueZero, to a predicate
 * that must return `true`, or to a pipe array ending in a predicate. Prefix a
 * key with `!` to negate it. To match an array value, use a predicate.
 *
 * Input is never mutated - always returns a new array.
 *
 * @param {Object} match - Map of keys to values, predicates or pipe arrays
 * @param {Object} patcher - Map of keys to values, functions or pipe arrays
 * @param {Array} input - Array of objects to transform
 *
 * @returns {Array} New array, matching items updated
 *
 * @throws {TypeError} If `match` or the patcher is not an Object, the input is
 * not an Array or an item is not an Object
 *
 * @example
 * updateWith({ id: 2 }, { count: x => x + 1 }, [
 *   { id: 1, count: 0 },
 *   { id: 2, count: 1 }
 * ])
 * // => [{ id: 1, count: 0 }, { id: 2, count: 2 }]
 *
 * updateWith({ name: isSomething }, { active: true })([
 *   { name: "foo", active: false },
 *   { name: undefined, active: false }
 * ])
 * // => [{ name: "foo", active: true }, { name: undefined, active: false }]
 *
 * updateWith({ "!active": true }, { count: [x => x + 1, x => x * 2] })([
 *   { active: false, count: 1 },
 *   { active: true, count: 1 }
 * ])
 * // => [{ active: false, count: 4 }, { active: true, count: 1 }]
 *
 * pipe(
 *   updateWith({ id: 1 }, { count: x => x + 1 }),
 *   map(read("count"))
 * )([{ id: 1, count: 0 }, { id: 2, count: 0 }])
 * // => [1, 0]
 *
 * @name updateWith
 * @tag Array
 *
 * @see {@link update}
 * @see {@link upsertWith}
 * @see {@link evolveWith}
 */
const updateWith = ((...params: unknown[]) => {
  const predicate = _buildMatch(params[0], {
    fnName: "updateWith",
    inputName: "input[*]",
  })
  const patch = _buildPatch(params[1], {
    fnName: "updateWith",
    inputName: "input[*]",
    isTransformOnly: false,
  })

  // @signature (match, patcher) => (input)
  if (params.length === 2) {
    return (input: unknown) => _updateWith(predicate, patch, input)
  }

  // @signature (match, patcher, input)
  return _updateWith(predicate, patch, params[2])
}) as UpdateWithFn

export { updateWith }
export type { UpdateWithFn }
