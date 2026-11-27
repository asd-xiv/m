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

type Binary = ArrayBuffer | SharedArrayBuffer | DataView

// A browser defines SharedArrayBuffer only on a cross-origin isolated page
const _isBinary = (input: object): input is Binary =>
  input instanceof ArrayBuffer ||
  input instanceof DataView ||
  (typeof SharedArrayBuffer === "function" &&
    input instanceof SharedArrayBuffer)

const _toBytes = (input: Binary): Uint8Array =>
  input instanceof DataView
    ? new Uint8Array(input.buffer, input.byteOffset, input.byteLength)
    : new Uint8Array(input)

const _isBytesEqual = (left: Uint8Array, right: Uint8Array): boolean => {
  if (left.length !== right.length) {
    return false
  }

  for (let index = 0, length = left.length; index < length; index++) {
    if (left[index] !== right[index]) {
      return false
    }
  }

  return true
}

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

  // A buffer and a DataView have no keys and no length, so compare their
  // bytes. fast-deep-equal 3.1.3 calls two different buffers equal, and loops
  // forever on a DataView. The constructors match, so `right` has the same type
  if (_isBinary(left)) {
    return _isBytesEqual(_toBytes(left), _toBytes(right as Binary))
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
  // React marks an element with a symbol, which JSON cannot produce. A JSON
  // object with a `$$typeof` key keeps its `_owner` in the comparison
  const isReactElement =
    typeof (left as { $$typeof?: unknown }).$$typeof === "symbol"

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
 * Check two values for deep equality: arrays and typed arrays by items, an
 * `ArrayBuffer`, `SharedArrayBuffer` or `DataView` by bytes, `Map` by entries,
 * `Set` by keys, `RegExp` by source and flags, a `Date` or any object with its
 * own `valueOf` or `toString` by that result, other objects by own enumerable
 * keys. Objects of different constructors are never equal. A React element
 * skips its `_owner`, which is circular. Two `NaN` are equal.
 *
 * State a JS program cannot read is not compared, eg. the contents of a `Blob`,
 * the value of a `Promise` or a `#private` field.
 *
 * To compare secrets, eg. two signatures, use `crypto.timingSafeEqual`:
 * `isDeepEqual` returns at the first difference, so its time leaks where the
 * values differ.
 *
 * It recurses, so the stack limits the depth: deeply nested input throws a
 * `RangeError`. The limit depends on V8's stack size and on whether V8 has
 * optimized the function yet. Run `src/is-deep-equal/bench/depth.ts` to find
 * it on your machine, next to Node's, lodash's and underscore's. `JSON.parse`
 * accepts any depth, so check the depth of untrusted input first, if it can
 * be that deep.
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
