import type { DeepValue } from "../../types/object.js"

import { isSomething } from "../is/is.js"
import { type } from "../type/type.js"

type ReadFn = {
  // Deep path with default, uncurried
  <I, P extends readonly (string | number)[], D extends DeepValue<I, P>>(
    path: readonly [...P],
    defaultValue: D,
    input: I
  ): DeepValue<I, P> extends undefined ? D : DeepValue<I, P> | D

  // Deep path with default, curried
  <P extends readonly (string | number)[], D>(
    path: readonly [...P],
    defaultValue: D
  ): <I>(
    input: I
  ) => DeepValue<I, P> extends undefined ? D : DeepValue<I, P> | D

  // Single key with default, uncurried
  <I, K extends keyof I>(path: K, defaultValue: I[K], input: I): I[K]

  // Single key with default, curried
  <K extends string, D>(
    path: K,
    defaultValue: D
  ): <I extends Record<K, unknown>>(input: I) => I[K] | D

  // Single key without default, curried
  <K extends string>(path: K): <I extends Record<K, unknown>>(input: I) => I[K]

  // Deep path without default, curried
  <P extends readonly (string | number)[]>(
    path: readonly [...P]
  ): <I>(input: I) => DeepValue<I, P>

  // Fallback: plain string without default
  (path: string): (input: unknown) => unknown
}

const _read = (
  path: string | readonly (string | number)[],
  defaultValue: unknown,
  input: unknown
): unknown => {
  if (!isSomething(input) || typeof input !== "object") {
    return defaultValue
  }

  const segments: readonly (string | number)[] = Array.isArray(path)
    ? (path as readonly (string | number)[])
    : [path as string]
  let result: unknown = input

  for (let i = 0, length = segments.length; i < length; i++) {
    if (result === null || typeof result !== "object") {
      result = undefined
      break
    }

    const segment = segments[i]!

    // Own keys only: `read("constructor")({})` is undefined, not `Object`
    result = Object.hasOwn(result, segment)
      ? (result as Record<string | number, unknown>)[segment]
      : undefined
  }

  return result === undefined && defaultValue !== undefined
    ? defaultValue
    : result
}

/**
 * Read a value from an object by key or deep path. Returns `undefined`
 * for missing paths, or an optional default value. Only own keys count:
 * `read("toString")({})` is `undefined`.
 *
 * @param {string|Array} path - Property key or array of keys for deep access
 * @param {unknown} [defaultValue] - Value to return when path is missing
 * @param {unknown} [input] - Source object to read from
 *
 * @returns {unknown} The value at path, or defaultValue if missing
 *
 * @example
 * read("name", "unknown", { name: "alice", age: 30 })
 * // => "alice"
 *
 * read("name")({ name: "alice", age: 30 })
 * // => "alice"
 *
 * read("missing")({ name: "alice" })
 * // => undefined
 *
 * read(["a", "b"])({ a: { b: "deep" } })
 * // => "deep"
 *
 * read(["a", "missing"], "default", { a: {} })
 * // => "default"
 *
 * // In a pipe - extract and transform
 * pipe(read("name"), name => name.toUpperCase())({ name: "alice" })
 * // => "ALICE"
 *
 * // With filter and predicate pipes
 * filter([read("id"), isSomething], [{ id: 1 }, {}, { id: 0 }])
 * // => [{ id: 1 }, { id: 0 }]
 *
 * @name read
 * @tag Object
 * @alias get
 *
 * @see {@link pick}
 * @see {@link update}
 */
const read = ((...params: unknown[]) => {
  const path = params[0]

  if (typeof path !== "string" && !Array.isArray(path)) {
    throw new TypeError(
      `@asd14/m/read: expected 'path' to be 'String' or 'Array', got '${type(path)}'`
    )
  }

  // @signature (path) => (input)
  if (params.length === 1) {
    return (input: unknown) => _read(path, undefined, input)
  }

  // @signature (path, defaultValue) => (input)
  if (params.length === 2) {
    return (input: unknown) => _read(path, params[1], input)
  }

  // @signature (path, defaultValue, input)
  return _read(path, params[1], params[2])
}) as ReadFn

export { read, read as get }
export type { ReadFn }
