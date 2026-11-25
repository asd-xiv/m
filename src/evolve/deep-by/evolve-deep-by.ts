import type { DeepValues, PlainObject } from "../../../types/object.js"

import { isPlainObject } from "../../is/is.js"
import { type } from "../../type/type.js"
import { _setOwn } from "../../utils/set-own.js"

type EvolveDeepByFn = {
  <T extends PlainObject>(
    fn: (key: string, value: DeepValues<T>, parents: string[]) => DeepValues<T>,
    input: T
  ): T
  <T extends PlainObject>(
    fn: (key: string, value: DeepValues<T>, parents: string[]) => DeepValues<T>
  ): (input: T) => T
}

const _evolveDeepBy = (
  fn: (key: string, value: unknown, parents: string[]) => unknown,
  input: PlainObject,
  parents: string[] = [],
  seen: WeakSet<object> = new WeakSet()
): PlainObject => {
  if (!isPlainObject(input)) {
    throw new TypeError(
      `@asd14/m/evolveDeepBy: expected 'input' to be 'Object', got '${type(input)}'`
    )
  }

  // `seen` holds the ancestors of `input` only: an object referenced twice is
  // evolved twice, an object that contains itself is left as is
  seen.add(input)

  const result: PlainObject = {}
  for (const [key, value] of Object.entries(input)) {
    const evolved = isPlainObject(value)
      ? seen.has(value)
        ? value
        : _evolveDeepBy(fn, value, [...parents, key], seen)
      : fn(key, value, parents)

    _setOwn(result, key, evolved)
  }

  seen.delete(input)

  return result
}

/**
 * Recursively walk all keys of a plain object, calling `fn` only on leaf
 * values (non-plain-object values). Structure and value types are always
 * preserved — `fn` must return a value of the same type union as the input.
 *
 * Input is never mutated - always returns a new object.
 *
 * @param {Function} fn - Called with `(key, leafValue, parents)` for every leaf; return the new value.
 *   `parents` is the ancestor key chain above the current leaf,
 *   e.g. `["user", "address"]` when processing `city`
 * @param {Object} input - Plain object to walk
 *
 * @returns {Object} New object with the same structure, leaf values transformed
 *
 * @throws {TypeError} If fn is not a Function or input is not a plain Object
 *
 * @example
 * evolveDeepBy(
 *   (_key, value) => typeof value === "number" ? value * 2 : value,
 *   { a: 1, b: { c: 2 } }
 * )
 * // => { a: 2, b: { c: 4 } }
 *
 * evolveDeepBy((_key, value) => typeof value === "number" ? value * 2 : value)(
 *   { a: 1, b: { c: 2 } }
 * )
 * // => { a: 2, b: { c: 4 } }
 *
 * // Use parents to redact all values nested under a sensitive key
 * const SENSITIVE = ["password", "credentials"]
 * const input = {
 *   credentials: { user: "alice", pass: "s3cr3t" },
 *   name: "Bob"
 * }
 * evolveDeepBy(
 *   (key, value, parents) =>
 *     SENSITIVE.includes(key) || parents.some(p => SENSITIVE.includes(p))
 *       ? "[redacted]"
 *       : value,
 *   input
 * )
 * // => { credentials: { user: "[redacted]", pass: "[redacted]" }, name: "Bob" }
 *
 * // In a pipe
 * pipe(
 *   find(isMatch({ id: 2 })),
 *   evolveDeepBy((_key, value) => typeof value === "number" ? value + 1 : value)
 * )([{ id: 1, meta: { n: 1 } }, { id: 2, meta: { n: 5 } }])
 * // => { id: 3, meta: { n: 6 } }
 *
 * @name evolveDeepBy
 * @tag Object
 *
 * @see {@link evolve}
 * @see {@link evolveWith}
 * @see {@link evolveMany}
 */
const evolveDeepBy = ((...params: unknown[]) => {
  const fn = params[0]

  if (typeof fn !== "function") {
    throw new TypeError(
      `@asd14/m/evolveDeepBy: expected 'fn' to be 'Function', got '${type(fn)}'`
    )
  }

  // @signature (fn) => (input)
  if (params.length === 1) {
    return (input: PlainObject) =>
      _evolveDeepBy(
        fn as (key: string, value: unknown, parents: string[]) => unknown,
        input
      )
  }

  // @signature (fn, input)
  return _evolveDeepBy(
    fn as (key: string, value: unknown, parents: string[]) => unknown,
    params[1] as PlainObject
  )
}) as EvolveDeepByFn

export { evolveDeepBy }
export type { EvolveDeepByFn }
