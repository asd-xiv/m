import { type } from "../../type/type.js"

type EqualityFn<T> = (a: T, b: T) => boolean

type DistinctByFn = {
  <T>(fn: EqualityFn<T>, input: readonly T[]): T[]
  <T>(fn: EqualityFn<T>): (input: readonly T[]) => T[]
}

const _distinctBy = (
  fn: EqualityFn<unknown>,
  input: readonly unknown[]
): unknown[] => {
  if (!Array.isArray(input)) {
    throw new TypeError(
      `@asd14/m/distinctBy: expected 'input' to be 'Array', got '${type(input)}'`
    )
  }

  const result: unknown[] = []

  for (let i = 0, length = input.length; i < length; i++) {
    const item: unknown = input[i]
    let isDuplicate = false

    for (
      let index = 0, resultLength = result.length;
      index < resultLength;
      index++
    ) {
      if (fn(item, result[index])) {
        isDuplicate = true
        break
      }
    }

    if (!isDuplicate) {
      result.push(item)
    }
  }

  return result
}

/**
 * Remove duplicate values from an array using a custom equality function.
 * Order is preserved - first occurrence wins.
 *
 * Input is never mutated - always returns a new array.
 *
 * @param {Function} fn - Equality function `(newItem, keptItem) => boolean`,
 * called with the item being added first and an already kept item second
 * @param {Array} input - Array to deduplicate
 *
 * @returns {Array} New array with duplicates removed
 *
 * @example
 * distinctBy(
 *   (a, b) => a.id === b.id,
 *   [{ id: 1, name: "a" }, { id: 2, name: "b" }, { id: 1, name: "c" }]
 * )
 * // => [{ id: 1, name: "a" }, { id: 2, name: "b" }]
 *
 * distinctBy((a, b) => a.id === b.id)([
 *   { id: 1, name: "a" }, { id: 2, name: "b" }, { id: 1, name: "c" }
 * ])
 * // => [{ id: 1, name: "a" }, { id: 2, name: "b" }]
 *
 * // In a pipe - deduplicate by a field
 * pipe(
 *   filter(isMatch({ active: true })),
 *   distinctBy((a, b) => a.email === b.email)
 * )([
 *   { email: "a@x.io", active: true },
 *   { email: "a@x.io", active: true },
 *   { email: "b@x.io", active: false },
 * ])
 * // => [{ email: "a@x.io", active: true }]
 *
 * @name distinctBy
 * @tag Array
 *
 * @see {@link distinct}
 * @see {@link uniteBy}
 */
const distinctBy = ((...params: unknown[]) => {
  const fn = params[0]

  if (typeof fn !== "function") {
    throw new TypeError(
      `@asd14/m/distinctBy: expected 'fn' to be 'Function', got '${type(fn)}'`
    )
  }

  // @signature (fn) => (input)
  if (params.length === 1) {
    return (input: readonly unknown[]) =>
      _distinctBy(fn as EqualityFn<unknown>, input)
  }

  // @signature (fn, input)
  return _distinctBy(fn as EqualityFn<unknown>, params[1] as readonly unknown[])
}) as DistinctByFn

export { distinctBy }
export type { DistinctByFn, EqualityFn }
