import type { PlainObject } from "../../../types/object.js"
import { isPlainObject } from "../../is/is.js"
import { type } from "../../type/type.js"
import { _setOwn } from "../../utils/set-own.js"

type MergeStrategy = (left: unknown, right: unknown, key: string) => unknown

type MergeByFn = {
  (strategy: MergeStrategy, a: PlainObject, b: PlainObject): PlainObject
  (strategy: MergeStrategy, a: PlainObject): (b: PlainObject) => PlainObject
}

const _mergeBy = (
  strategy: MergeStrategy,
  a: PlainObject,
  b: unknown
): PlainObject => {
  if (!isPlainObject(b)) {
    throw new TypeError(
      `@asd14/m/mergeBy: expected 'b' to be 'Object', got '${type(b)}'`
    )
  }

  const result: PlainObject = { ...a }
  const keys = Object.keys(b)

  for (let i = 0, length = keys.length; i < length; i++) {
    const key = keys[i]!
    const left = Object.hasOwn(a, key) ? a[key] : undefined

    _setOwn(result, key, strategy(left, b[key], key))
  }

  return result
}

/**
 * Shallow-merge two objects, resolving each key with a strategy function. The
 * strategy runs for every key of `b` with `(left, right, key)`, where `left` is
 * the value of `a` or `undefined` when `a` has no such key. Keys only in `a`
 * are kept as they are.
 *
 * Only own keys count, and a `"__proto__"` key stays an own key.
 *
 * Input is never mutated - always returns a new object.
 *
 * @param {Function} strategy - `(left, right, key) => value` for each key of `b`
 * @param {Object} a - Base object
 * @param {Object} [b] - Object merged on top of `a`
 *
 * @returns {Object} New object with the strategy result for each key of `b`
 *
 * @example
 * const higher = (left, right) => Math.max(left ?? right, right)
 *
 * mergeBy(higher, { a: 1 }, { a: 5, b: 3 })
 * // => { a: 5, b: 3 }
 *
 * mergeBy(higher, { a: 1 })({ a: 5, b: 3 })
 * // => { a: 5, b: 3 }
 *
 * // In a pipe - keep the defined value of the incoming settings
 * const definedWins = (left, right) => (right === undefined ? left : right)
 *
 * pipe(
 *   read("overrides"),
 *   mergeBy(definedWins, { port: 3000, debug: false })
 * )({ overrides: { port: undefined, debug: true } })
 * // => { port: 3000, debug: true }
 *
 * @name mergeBy
 * @tag Object
 *
 * @see {@link merge}
 */
const mergeBy = ((...params: unknown[]) => {
  const strategy = params[0]
  const a = params[1]

  if (typeof strategy !== "function") {
    throw new TypeError(
      `@asd14/m/mergeBy: expected 'strategy' to be 'Function', got '${type(strategy)}'`
    )
  }

  if (!isPlainObject(a)) {
    throw new TypeError(
      `@asd14/m/mergeBy: expected 'a' to be 'Object', got '${type(a)}'`
    )
  }

  // @signature (strategy, a) => (b)
  if (params.length === 2) {
    return (b: unknown) => _mergeBy(strategy as MergeStrategy, a, b)
  }

  // @signature (strategy, a, b)
  return _mergeBy(strategy as MergeStrategy, a, params[2])
}) as MergeByFn

export { mergeBy }
export type { MergeByFn, MergeStrategy }
