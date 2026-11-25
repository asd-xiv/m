import type { PlainObject } from "../../../types/object.js"
import type { Matcher } from "../../../types/object.matcher.js"
import type {
  AnyEvolver,
  Evolved,
  Evolver,
} from "../../../types/object.patcher.js"
import { type } from "../../type/type.js"
import { _buildMatch } from "../../utils/build-match.js"
import { _buildPatch } from "../../utils/build-patch.js"

type EvolveWithFn = {
  <T extends PlainObject, P extends Evolver<T>>(
    match: Matcher<T>,
    patcher: P,
    input: readonly T[]
  ): (T | Evolved<T, P>)[]

  // Curried: type the parameter of each function in the patcher
  <M extends PlainObject, P extends AnyEvolver>(
    match: Matcher<M>,
    patcher: P
  ): <T extends M>(input: readonly T[]) => (T | Evolved<T, P>)[]
}

const _evolveWith = (
  predicate: (input: unknown) => boolean,
  patch: (input: unknown) => PlainObject,
  input: unknown
): unknown[] => {
  if (!Array.isArray(input)) {
    throw new TypeError(
      `@asd14/m/evolveWith: expected 'input' to be 'Array', got '${type(input)}'`
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
 * Apply {@link evolve} to the objects of an array that satisfy `match`.
 * The other items stay as they are. Each key in the patcher maps to a function
 * `(currentValue, source) => newValue` or to an array of functions to pipe.
 *
 * A `match` key maps to a value compared with SameValueZero, to a predicate
 * that must return `true`, or to a pipe array ending in a predicate. Prefix a
 * key with `!` to negate it. To match an array value, use a predicate.
 *
 * Input is never mutated - always returns a new array.
 *
 * @param {Object} match - Map of keys to values, predicates or pipe arrays
 * @param {Object} patcher - Map of keys to functions or pipe arrays
 * @param {Array} input - Array of objects to transform
 *
 * @returns {Array} New array, matching items evolved
 *
 * @throws {TypeError} If `match` or the patcher is not an Object, a patcher
 * value is not a Function or Array, the input is not an Array or an item is not
 * an Object
 *
 * @example
 * evolveWith({ id: 2 }, { count: x => x + 1 }, [
 *   { id: 1, count: 0 },
 *   { id: 2, count: 1 }
 * ])
 * // => [{ id: 1, count: 0 }, { id: 2, count: 2 }]
 *
 * evolveWith({ id: 2 }, { count: x => x + 1 })([
 *   { id: 1, count: 0 },
 *   { id: 2, count: 1 }
 * ])
 * // => [{ id: 1, count: 0 }, { id: 2, count: 2 }]
 *
 * evolveWith({ "!name": isSomething }, { count: [x => x + 1, x => x * 2] })([
 *   { count: 1 },
 *   { name: "foo", count: 1 }
 * ])
 * // => [{ count: 4 }, { name: "foo", count: 1 }]
 *
 * pipe(
 *   evolveWith({ id: 1 }, { count: x => x + 1 }),
 *   map(read("count"))
 * )([{ id: 1, count: 0 }, { id: 2, count: 0 }])
 * // => [1, 0]
 *
 * @name evolveWith
 * @tag Array
 *
 * @see {@link evolve}
 * @see {@link evolveMany}
 * @see {@link updateWith}
 */
const evolveWith = ((...params: unknown[]) => {
  const predicate = _buildMatch(params[0], {
    fnName: "evolveWith",
    inputName: "input[*]",
  })
  const patch = _buildPatch(params[1], {
    fnName: "evolveWith",
    inputName: "input[*]",
    isTransformOnly: true,
  })

  // @signature (match, patcher) => (input)
  if (params.length === 2) {
    return (input: unknown) => _evolveWith(predicate, patch, input)
  }

  // @signature (match, patcher, input)
  return _evolveWith(predicate, patch, params[2])
}) as EvolveWithFn

export { evolveWith }
export type { EvolveWithFn }
