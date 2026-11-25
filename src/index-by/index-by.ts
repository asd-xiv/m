import type { AnyMorphism, UnaryMorphism } from "../../types/function.js"
import { type } from "../type/type.js"
import { _setOwn } from "../utils/set-own.js"
import { _toFunction } from "../utils/to-function.js"

type IndexByFn = {
  // Pipe of 3 functions, the last one returns the key
  <T1, T2, T3>(
    fns: [
      UnaryMorphism<T1, T2>,
      UnaryMorphism<T2, T3>,
      UnaryMorphism<T3, string | number>,
    ],
    input: readonly T1[]
  ): Record<string, T1>
  <T1, T2, T3>(
    fns: [
      UnaryMorphism<T1, T2>,
      UnaryMorphism<T2, T3>,
      UnaryMorphism<T3, string | number>,
    ]
  ): (input: readonly T1[]) => Record<string, T1>

  // Pipe of 2 functions, the last one returns the key
  <T1, T2>(
    fns: [UnaryMorphism<T1, T2>, UnaryMorphism<T2, string | number>],
    input: readonly T1[]
  ): Record<string, T1>
  <T1, T2>(
    fns: [UnaryMorphism<T1, T2>, UnaryMorphism<T2, string | number>]
  ): (input: readonly T1[]) => Record<string, T1>

  <T>(fn: (item: T) => string | number, input: readonly T[]): Record<string, T>
  <T>(
    fn: (item: T) => string | number
  ): (input: readonly T[]) => Record<string, T>
}

const _indexBy = (fn: AnyMorphism, input: unknown): Record<string, unknown> => {
  if (!Array.isArray(input)) {
    throw new TypeError(
      `@asd14/m/indexBy: expected 'input' to be 'Array', got '${type(input)}'`
    )
  }

  const result: Record<string, unknown> = {}

  for (let i = 0, length = input.length; i < length; i++) {
    const item: unknown = input[i]

    _setOwn(result, String(fn(item)), item)
  }

  return result
}

/**
 * Index the items of an array by the key a function returns for each. Returns
 * an object where each key holds one item. The function returns a string or a
 * number, and the key is its string form.
 *
 * On a duplicate key the last item wins.
 *
 * Only own keys count, so `"constructor"`, `"toString"` and `"__proto__"` work
 * as keys.
 *
 * Input is never mutated - always returns a new object.
 *
 * @param {Function|Array} fn - `(item) => key`, or a pipe array of functions
 * @param {Array} [input] - Array to index
 *
 * @returns {Object} Object of items, one for each key
 *
 * @example
 * indexBy(user => user.id, [
 *   { id: 1, name: "alice" },
 *   { id: 2, name: "bob" }
 * ])
 * // => { 1: { id: 1, name: "alice" }, 2: { id: 2, name: "bob" } }
 *
 * // The last item wins on a duplicate key
 * indexBy(user => user.role)([
 *   { name: "alice", role: "admin" },
 *   { name: "carol", role: "admin" }
 * ])
 * // => { admin: { name: "carol", role: "admin" } }
 *
 * // A pipe array builds the key in steps
 * indexBy([read("name"), name => name.toUpperCase()], users)
 * // => { ALICE: {...}, BOB: {...} }
 *
 * // In a pipe - list the keys
 * pipe(
 *   indexBy(n => n % 3),
 *   keys
 * )([1, 2, 3, 4, 5])
 * // => ["0", "1", "2"]
 *
 * @name indexBy
 * @tag Array
 *
 * @see {@link groupBy}
 */
const indexBy = ((...params: unknown[]) => {
  const fn = _toFunction(params[0], { fnName: "indexBy", paramName: "fn" })

  // @signature (fn) => (input)
  if (params.length === 1) {
    return (input: unknown) => _indexBy(fn, input)
  }

  // @signature (fn, input)
  return _indexBy(fn, params[1])
}) as IndexByFn

export { indexBy }
export type { IndexByFn }
