import type { Patcher } from "../../types/object.patcher.ts"
import type { PlainObject } from "../../types/object.ts"
import { _buildPatch } from "../utils/build-patch.ts"

type UpdateFn = {
  <T extends PlainObject>(patcher: Patcher<T>, input: T): T
  // Curried: T is inferred from the patcher, the input may have more keys
  <T extends PlainObject>(patcher: Patcher<T>): <U extends T>(input: U) => U
}

/**
 * Write keys of a single object. Each key in the patcher maps to a plain
 * value, a function `(currentValue, source) => newValue` or an array of
 * functions to pipe. The result keeps the type of the input.
 *
 * Unlike {@link evolve}, `update` writes every patcher key, including a key
 * the input lacks, so it can set a missing optional key. A plain value is
 * never an array: m reads an array as a pipe. To set an array, return it from a
 * function: `() => ["x"]`.
 *
 * Input is never mutated - always returns a new object.
 *
 * @param {Object} patcher - Map of keys to values, functions or pipe arrays
 * @param {Object} input - Source object to transform
 *
 * @returns {Object} New object with patches applied
 *
 * @throws {TypeError} If the patcher or the input is not an Object, or a
 * pipe array is empty or holds a non-Function
 *
 * @example
 * update({ name: "bar" }, { name: "foo", id: 1 })
 * // => { name: "bar", id: 1 }
 *
 * update({ count: x => x + 1 })({ count: 1, name: "test" })
 * // => { count: 2, name: "test" }
 *
 * update({ count: [x => x + 1, x => x * 2] })({ count: 2 })
 * // => { count: 6 }
 *
 * // Set an array with a function
 * update({ tags: () => ["x"] })({ tags: ["a"] })
 * // => { tags: ["x"] }
 *
 * // In a pipe, update found item
 * pipe(
 *   find(isMatch({ id: 2 })),
 *   defaultTo({ id: 0, count: 0 }),
 *   update({ count: x => x + 1 })
 * )([{ id: 1, count: 10 }, { id: 2, count: 5 }])
 * // => { id: 2, count: 6 }
 *
 * @name update
 * @tag Object
 *
 * @see {@link evolve}
 * @see {@link updateWith}
 */
const update = ((...params: unknown[]) => {
  const patch = _buildPatch(params[0], {
    fnName: "update",
    inputName: "input",
    isTransformOnly: false,
  })

  // @signature (patcher) => (input)
  if (params.length === 1) {
    return patch
  }

  // @signature (patcher, input)
  return patch(params[1])
}) as UpdateFn

export { update }
export type { UpdateFn }
