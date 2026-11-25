import type { DeepWrite, PlainObject } from "../../types/object.js"

import { isPlainObject } from "../is/is.js"
import { type } from "../type/type.js"
import { _setOwn } from "../utils/set-own.js"

type WritePath = readonly [string | number, ...(string | number)[]]

// Any value. Naming the primitives keeps a literal, eg. "done", so DeepWrite
// can check it against the field it replaces
type WriteValue =
  string | number | boolean | bigint | symbol | object | null | undefined

type WriteFn = {
  // Deep path, uncurried
  <I extends object, const P extends WritePath, V extends WriteValue>(
    path: P,
    value: V,
    input: I
  ): DeepWrite<I, P, V>

  // Deep path, curried
  <const P extends WritePath, V extends WriteValue>(
    path: P,
    value: V
  ): <I extends object>(input: I) => DeepWrite<I, P, V>

  // Single key, uncurried
  <I extends object, K extends string, V extends WriteValue>(
    path: K,
    value: V,
    input: I
  ): DeepWrite<I, [K], V>

  // Single key, curried
  <K extends string, V extends WriteValue>(
    path: K,
    value: V
  ): <I extends object>(input: I) => DeepWrite<I, [K], V>
}

type Container = PlainObject | unknown[]

const isIndex = (segment: string | number): boolean =>
  typeof segment === "number" && Number.isInteger(segment) && segment >= 0

const shallowCopy = (container: Container): PlainObject =>
  (Array.isArray(container) ? [...container] : { ...container }) as PlainObject

const _write = (
  segments: readonly (string | number)[],
  value: unknown,
  input: unknown
): unknown => {
  if (!isPlainObject(input) && !Array.isArray(input)) {
    throw new TypeError(
      `@asd14/m/write: expected 'input' to be 'Object' or 'Array', got '${type(input)}'`
    )
  }

  const result = shallowCopy(input)
  const lastIndex = segments.length - 1
  let node = result
  let pathName = "input"

  for (let i = 0; i < lastIndex; i++) {
    const segment = segments[i]!
    const key = String(segment)
    const child = Object.hasOwn(node, key) ? node[key] : undefined
    let copy: PlainObject

    pathName += isIndex(segment) ? `[${key}]` : `.${key}`

    if (child === undefined) {
      copy = (isIndex(segments[i + 1]!) ? [] : {}) as PlainObject
    } else if (isPlainObject(child) || Array.isArray(child)) {
      copy = shallowCopy(child)
    } else {
      throw new TypeError(
        `@asd14/m/write: expected '${pathName}' to be 'Object' or 'Array', got '${type(child)}'`
      )
    }

    _setOwn(node, key, copy)
    node = copy
  }

  _setOwn(node, String(segments[lastIndex]), value)

  return result
}

/**
 * Write a value at a key or a deep path. Creates each missing step: an array
 * for an integer segment, a plain object for any other. Copies only the
 * objects along the path, every other branch keeps its reference.
 *
 * Input is never mutated, always returns a new object or array.
 *
 * @param {string|Array} path - Key, or array of keys and indexes for deep access
 * @param {unknown} value - Value to write, a function included
 * @param {Object|Array} input - Object or array to write into
 *
 * @returns {Object|Array} A copy of `input` with `value` at `path`
 *
 * @throws {TypeError} When a value on the path is neither a plain object nor
 * an array, eg. `expected 'input.a' to be 'Object' or 'Array', got 'Number'`
 *
 * @example
 * write("name", "bob", { id: 1, name: "alice" })
 * // => { id: 1, name: "bob" }
 *
 * write("name", "bob")({ id: 1 })
 * // => { id: 1, name: "bob" }
 *
 * write(["a", "b"], 2, { a: { b: 1, c: 3 } })
 * // => { a: { b: 2, c: 3 } }
 *
 * write(["tags", 0], "x")({})
 * // => { tags: ["x"] }
 *
 * pipe(
 *   write(["user", "name"], "bob"),
 *   read(["user", "name"])
 * )({ user: { name: "alice" } })
 * // => "bob"
 *
 * @name write
 * @tag Object
 *
 * @see {@link read}
 * @see {@link update}
 */
const write = ((...params: unknown[]) => {
  const path = params[0]

  if (typeof path !== "string" && !Array.isArray(path)) {
    throw new TypeError(
      `@asd14/m/write: expected 'path' to be 'String' or 'Array', got '${type(path)}'`
    )
  }

  if (Array.isArray(path) && path.length === 0) {
    throw new TypeError(
      "@asd14/m/write: expected 'path' to be 'NonEmpty', got 'Empty'"
    )
  }

  if (params.length === 1) {
    throw new TypeError(
      "@asd14/m/write: expected 'value' to be 'Any', got 'Missing'"
    )
  }

  const segments: readonly (string | number)[] = Array.isArray(path)
    ? (path as readonly (string | number)[])
    : [path]

  for (let i = 0, length = segments.length; i < length; i++) {
    const segment = segments[i]

    if (typeof segment !== "string" && typeof segment !== "number") {
      throw new TypeError(
        `@asd14/m/write: expected 'path[${i}]' to be 'String' or 'Number', got '${type(segment)}'`
      )
    }
  }

  // @signature (path, value) => (input)
  if (params.length === 2) {
    return (input: unknown) => _write(segments, params[1], input)
  }

  // @signature (path, value, input)
  return _write(segments, params[1], params[2])
}) as WriteFn

export { write }
export type { WriteFn }
