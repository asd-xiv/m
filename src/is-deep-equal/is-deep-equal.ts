/*
 * Ported from fast-deep-equal 3.1.3, its ES6 and React build, to TypeScript
 * https://github.com/epoberezkin/fast-deep-equal
 * MIT License, Copyright (c) 2017 Evgeny Poberezkin
 */

type IsDeepEqualFn = {
  (left: unknown, right: unknown): boolean
  (left: unknown): (right: unknown) => boolean
}

type IndexedView = ArrayLike<unknown>

type Stringable = { toString: () => string }

const _isDeepEqual = (left: unknown, right: unknown): boolean => {
  if (left === right) {
    return true
  }

  if (
    typeof left !== "object" ||
    typeof right !== "object" ||
    left === null ||
    right === null
  ) {
    // Both NaN, the one value not equal to itself
    return left !== left && right !== right
  }

  if (left.constructor !== right.constructor) {
    return false
  }

  if (Array.isArray(left)) {
    const items = right as unknown[]

    if (left.length !== items.length) {
      return false
    }

    for (let index = 0, length = left.length; index < length; index++) {
      if (!_isDeepEqual(left[index], items[index])) {
        return false
      }
    }

    return true
  }

  if (left instanceof Map && right instanceof Map) {
    if (left.size !== right.size) {
      return false
    }

    for (const key of left.keys()) {
      if (!right.has(key)) {
        return false
      }
    }

    for (const [key, item] of left) {
      if (!_isDeepEqual(item, right.get(key))) {
        return false
      }
    }

    return true
  }

  if (left instanceof Set && right instanceof Set) {
    if (left.size !== right.size) {
      return false
    }

    for (const item of left) {
      if (!right.has(item)) {
        return false
      }
    }

    return true
  }

  if (ArrayBuffer.isView(left) && ArrayBuffer.isView(right)) {
    const leftView = left as unknown as IndexedView
    const rightView = right as unknown as IndexedView

    if (leftView.length !== rightView.length) {
      return false
    }

    for (let index = 0; index < leftView.length; index++) {
      if (leftView[index] !== rightView[index]) {
        return false
      }
    }

    return true
  }

  if (left instanceof RegExp && right instanceof RegExp) {
    return left.source === right.source && left.flags === right.flags
  }

  // A null-prototype object has neither `valueOf` nor `toString`: it falls
  // through to the keys. fast-deep-equal 3.1.3 throws a TypeError here
  if (
    typeof left.valueOf === "function" &&
    left.valueOf !== Object.prototype.valueOf
  ) {
    return left.valueOf() === right.valueOf()
  }

  // An own `toString` stringifies the object, not the `[object Object]` default
  if (
    typeof left.toString === "function" &&
    left.toString !== Object.prototype.toString
  ) {
    return (left as Stringable).toString() === (right as Stringable).toString()
  }

  const keys = Object.keys(left)

  if (keys.length !== Object.keys(right).length) {
    return false
  }

  const leftRecord = left as Record<string, unknown>
  const rightRecord = right as Record<string, unknown>
  const isReactElement = "$$typeof" in left

  for (let index = 0, length = keys.length; index < length; index++) {
    const key = keys[index] as string

    if (!Object.hasOwn(right, key)) {
      return false
    }

    // A React element's owner is circular, and not part of what it renders
    if (key === "_owner" && isReactElement) {
      continue
    }

    if (!_isDeepEqual(leftRecord[key], rightRecord[key])) {
      return false
    }
  }

  return true
}

/**
 * Check two values for deep equality: arrays and typed arrays by items, `Map`
 * by entries, `Set` by keys, `RegExp` by source and flags, a `Date` or any
 * object with its own `valueOf` or `toString` by that result, other objects by
 * own enumerable keys. Objects of different constructors are never equal. A
 * React element skips its `_owner`, which is circular. Two `NaN` are equal.
 *
 * Input is never mutated.
 *
 * @param {unknown} left - First value
 * @param {unknown} right - Second value
 *
 * @returns {boolean} True if the values are deeply equal
 *
 * @example
 * isDeepEqual({ a: [1, 2] }, { a: [1, 2] })
 * // => true
 *
 * isDeepEqual(new Date(0))(new Date(1))
 * // => false
 *
 * isDeepEqual(new Set([1, 2]), new Set([2, 1]))
 * // => true
 *
 * pipe(read("tags"), isDeepEqual(["a", "b"]))({ tags: ["a", "b"] })
 * // => true
 *
 * @name isDeepEqual
 * @tag Any value
 *
 * @see {@link isEqual}
 */
const isDeepEqual = ((...params: unknown[]) => {
  // @signature (left) => (right)
  if (params.length === 1) {
    return (right: unknown) => _isDeepEqual(params[0], right)
  }

  // @signature (left, right)
  return _isDeepEqual(params[0], params[1])
}) as IsDeepEqualFn

export { isDeepEqual }
export type { IsDeepEqualFn }
