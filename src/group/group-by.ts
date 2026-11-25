import type { AnyMorphism, UnaryMorphism } from "../../types/function.js"
import { type } from "../type/type.js"
import { _setOwn } from "../utils/set-own.js"
import { _toFunction } from "../utils/to-function.js"

type GroupByFn = {
  // Pipe of 3 functions, the last one returns the key
  <T1, T2, T3>(
    fns: [
      UnaryMorphism<T1, T2>,
      UnaryMorphism<T2, T3>,
      UnaryMorphism<T3, string | number>,
    ],
    input: readonly T1[]
  ): Record<string, T1[]>
  <T1, T2, T3>(
    fns: [
      UnaryMorphism<T1, T2>,
      UnaryMorphism<T2, T3>,
      UnaryMorphism<T3, string | number>,
    ]
  ): (input: readonly T1[]) => Record<string, T1[]>

  // Pipe of 2 functions, the last one returns the key
  <T1, T2>(
    fns: [UnaryMorphism<T1, T2>, UnaryMorphism<T2, string | number>],
    input: readonly T1[]
  ): Record<string, T1[]>
  <T1, T2>(
    fns: [UnaryMorphism<T1, T2>, UnaryMorphism<T2, string | number>]
  ): (input: readonly T1[]) => Record<string, T1[]>

  <T>(
    fn: (item: T) => string | number,
    input: readonly T[]
  ): Record<string, T[]>
  <T>(
    fn: (item: T) => string | number
  ): (input: readonly T[]) => Record<string, T[]>
}

const _groupBy = (
  fn: AnyMorphism,
  input: unknown
): Record<string, unknown[]> => {
  if (!Array.isArray(input)) {
    throw new TypeError(
      `@asd14/m/groupBy: expected 'input' to be 'Array', got '${type(input)}'`
    )
  }

  const result: Record<string, unknown[]> = {}

  for (let i = 0, length = input.length; i < length; i++) {
    const item: unknown = input[i]
    const key = String(fn(item))

    if (Object.hasOwn(result, key)) {
      result[key]!.push(item)
    } else {
      _setOwn(result, key, [item])
    }
  }

  return result
}

/**
 * Group the items of an array by the key a function returns for each. Returns
 * an object where each key holds the array of its items, in input order. The
 * function returns a string or a number, and the key is its string form.
 *
 * Only own keys count, so `"constructor"`, `"toString"` and `"__proto__"` work
 * as group keys.
 *
 * Input is never mutated - always returns a new object of new arrays.
 *
 * @param {Function|Array} fn - `(item) => key`, or a pipe array of functions
 * @param {Array} [input] - Array to group
 *
 * @returns {Object} Object of arrays, one for each key
 *
 * @example
 * groupBy(user => user.role, [
 *   { name: "alice", role: "admin" },
 *   { name: "bob", role: "user" },
 *   { name: "carol", role: "admin" }
 * ])
 * // => {
 * //   admin: [{ name: "alice", role: "admin" }, { name: "carol", role: "admin" }],
 * //   user: [{ name: "bob", role: "user" }]
 * // }
 *
 * groupBy(n => n % 2 === 0 ? "even" : "odd")([1, 2, 3, 4, 5])
 * // => { odd: [1, 3, 5], even: [2, 4] }
 *
 * groupBy(read("level"), [{ level: 1 }, { level: 2 }, { level: 1 }])
 * // => { "1": [{ level: 1 }, { level: 1 }], "2": [{ level: 2 }] }
 *
 * // A String step turns any key into a string. To split by a boolean,
 * // `partition(read("active"))` is the intended tool: it returns both
 * // groups as a pair
 * groupBy([read("active"), String], [{ active: true }, { active: false }])
 * // => { true: [{ active: true }], false: [{ active: false }] }
 *
 * // A pipe array builds the key in steps
 * groupBy([read("role"), role => role.toUpperCase()], users)
 * // => { ADMIN: [...], USER: [...] }
 *
 * // In a pipe - list the groups
 * pipe(
 *   groupBy(n => n % 2 === 0 ? "even" : "odd"),
 *   keys
 * )([1, 2, 3, 4, 5])
 * // => ["odd", "even"]
 *
 * @name groupBy
 * @tag Array
 *
 * @see {@link partition}
 * @see {@link distinctBy}
 */
const groupBy = ((...params: unknown[]) => {
  const fn = _toFunction(params[0], { fnName: "groupBy", paramName: "fn" })

  // @signature (fn) => (input)
  if (params.length === 1) {
    return (input: unknown) => _groupBy(fn, input)
  }

  // @signature (fn, input)
  return _groupBy(fn, params[1])
}) as GroupByFn

export { groupBy }
export type { GroupByFn }
