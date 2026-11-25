import type { PlainObject } from "../../types/object.js"
import type {
  AnyEvolver,
  Evolved,
  Evolver,
} from "../../types/object.patcher.js"
import { _buildPatch } from "../utils/build-patch.js"

type EvolveFn = {
  <T extends PlainObject, P extends Evolver<T>>(
    patcher: P,
    input: T
  ): Evolved<T, P>

  // Curried: type the parameter of each function in the patcher
  <P extends AnyEvolver>(
    patcher: P
  ): <T extends PlainObject>(input: T) => Evolved<T, P>
}

/**
 * Transform keys of a single object. Each key in the patcher maps to a
 * function `(currentValue, source) => newValue` or to an array of functions
 * to pipe. The result takes the type each function returns.
 *
 * Only keys the input already has are patched: a patcher key the input lacks
 * is skipped. A plain value in the patcher throws, use {@link update} to
 * replace a key. To set an array, return it from a function: `() => ["x"]`.
 *
 * Input is never mutated - always returns a new object.
 *
 * @param {Object} patcher - Map of keys to functions or pipe arrays
 * @param {Object} input - Source object to transform
 *
 * @returns {Object} New object with patches applied
 *
 * @throws {TypeError} If the patcher is not an Object, a patcher value is not a
 * Function or Array, or the input is not an Object
 *
 * @example
 * evolve({ count: x => x + 1 }, { count: 2, id: 1 })
 * // => { count: 3, id: 1 }
 *
 * evolve({ count: x => x + 1 })({ count: 2 })
 * // => { count: 3 }
 *
 * evolve({ count: [x => x + 1, x => x * 2] })({ count: 2 })
 * // => { count: 6 }
 *
 * // A key the input lacks is skipped
 * evolve({ count: x => x + 1 })({ id: 1 })
 * // => { id: 1 }
 *
 * // The second argument of a function is the whole object
 * evolve({ name: (name, user) => `${name} ${user.id}` })({ name: "foo", id: 1 })
 * // => { name: "foo 1", id: 1 }
 *
 * // In a pipe
 * pipe(
 *   find(isMatch({ id: 2 })),
 *   defaultTo({ id: 0, count: 0 }),
 *   evolve({ count: x => x + 1 })
 * )([{ id: 1, count: 10 }, { id: 2, count: 5 }])
 * // => { id: 2, count: 6 }
 *
 * @name evolve
 * @tag Object
 *
 * @see {@link update}
 * @see {@link evolveWith}
 * @see {@link evolveMany}
 */
const evolve = ((...params: unknown[]) => {
  const patch = _buildPatch(params[0], {
    fnName: "evolve",
    inputName: "input",
    isTransformOnly: true,
  })

  // @signature (patcher) => (input)
  if (params.length === 1) {
    return patch
  }

  // @signature (patcher, input)
  return patch(params[1])
}) as EvolveFn

export { evolve }
export type { EvolveFn }
