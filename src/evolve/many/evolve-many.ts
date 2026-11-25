import type { PlainObject } from "../../../types/object.js"
import type {
  AnyEvolver,
  Evolved,
  Evolver,
} from "../../../types/object.patcher.js"
import { type } from "../../type/type.js"
import { _buildPatch } from "../../utils/build-patch.js"

type EvolveManyFn = {
  <T extends PlainObject, P extends Evolver<T>>(
    patcher: P,
    input: readonly T[]
  ): Evolved<T, P>[]

  // Curried: type the parameter of each function in the patcher
  <P extends AnyEvolver>(
    patcher: P
  ): <T extends PlainObject>(input: readonly T[]) => Evolved<T, P>[]
}

const _evolveMany = (
  patch: (input: unknown) => PlainObject,
  input: unknown
): PlainObject[] => {
  if (!Array.isArray(input)) {
    throw new TypeError(
      `@asd14/m/evolveMany: expected 'input' to be 'Array', got '${type(input)}'`
    )
  }

  const result: PlainObject[] = []

  for (let i = 0, length = input.length; i < length; i++) {
    result.push(patch(input[i]))
  }

  return result
}

/**
 * Apply {@link evolve} to every object of an array. Each key in the patcher
 * maps to a function `(currentValue, source) => newValue` or to an array of
 * functions to pipe. An item that lacks a patcher key keeps it absent.
 *
 * Input is never mutated - always returns a new array of new objects.
 *
 * @param {Object} patcher - Map of keys to functions or pipe arrays
 * @param {Array} input - Array of objects to transform
 *
 * @returns {Array} New array of evolved objects
 *
 * @throws {TypeError} If the patcher is not an Object, a patcher value is not a
 * Function or Array, the input is not an Array or an item is not an Object
 *
 * @example
 * evolveMany({ id: x => x + 1 }, [{ id: 1 }, { id: 2 }])
 * // => [{ id: 2 }, { id: 3 }]
 *
 * evolveMany({ id: x => x + 1 })([{ id: 1 }, { name: "foo" }])
 * // => [{ id: 2 }, { name: "foo" }]
 *
 * evolveMany({ id: [x => x + 1, x => x * 2] })([{ id: 1 }])
 * // => [{ id: 4 }]
 *
 * pipe(
 *   filter(isMatch({ active: true })),
 *   evolveMany({ count: x => x + 1 })
 * )([{ active: true, count: 1 }, { active: false, count: 5 }])
 * // => [{ active: true, count: 2 }]
 *
 * @name evolveMany
 * @tag Array
 *
 * @see {@link evolve}
 * @see {@link evolveWith}
 */
const evolveMany = ((...params: unknown[]) => {
  const patch = _buildPatch(params[0], {
    fnName: "evolveMany",
    inputName: "input[*]",
    isTransformOnly: true,
  })

  // @signature (patcher) => (input)
  if (params.length === 1) {
    return (input: unknown) => _evolveMany(patch, input)
  }

  // @signature (patcher, input)
  return _evolveMany(patch, params[1])
}) as EvolveManyFn

export { evolveMany }
export type { EvolveManyFn }
