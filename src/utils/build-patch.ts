import { _setOwn } from "./set-own.js"
import { _toFunction } from "./to-function.js"
import type { AnyMorphism } from "../../types/function.js"
import type { PlainObject } from "../../types/object.js"

import { isPlainObject } from "../is/is.js"
import { type } from "../type/type.js"

type BuildPatchOptions = {
  /** The public function to name in the error, eg. `evolveMany` */
  fnName: string
  /** The input to name in the error: `input`, or `input[*]` for an item */
  inputName: string
  /**
   * Accept only functions and pipe arrays, and skip a key the input does not
   * have, since it has nothing to transform. `evolve` sets it, `update` does
   * not
   */
  isTransformOnly: boolean
}

type PatchEntry = [key: string, value: unknown, isFunction: boolean]

/**
 * Check a patcher once, and build the function that applies it to an object.
 * A function or a pipe array transforms a key: it gets the key's value and the
 * whole object. A plain value replaces the key.
 *
 * @throws {TypeError} When the patcher is not a plain object, or, with
 * `isTransformOnly`, a value is not a function or a pipe array
 * @example
 * const patch = _buildPatch(
 *   { count: x => x + 1, name: "bar" },
 *   { fnName: "update", inputName: "input", isTransformOnly: false }
 * )
 *
 * patch({ count: 1 })
 * // => { count: 2, name: "bar" }
 */
const _buildPatch = (
  patcher: unknown,
  { fnName, inputName, isTransformOnly }: BuildPatchOptions
): ((input: unknown) => PlainObject) => {
  if (!isPlainObject(patcher)) {
    throw new TypeError(
      `@asd14/m/${fnName}: expected 'patcher' to be 'Object', got '${type(patcher)}'`
    )
  }

  const keys = Object.keys(patcher)
  const entries: PatchEntry[] = []

  for (let index = 0, length = keys.length; index < length; index++) {
    const key = keys[index]!
    const value = patcher[key]
    const isFunction = typeof value === "function" || Array.isArray(value)

    if (isTransformOnly && !isFunction) {
      throw new TypeError(
        `@asd14/m/${fnName}: expected 'patcher.${key}' to be 'Function' or 'Array', got '${type(value)}'`
      )
    }

    entries.push([
      key,
      isFunction
        ? _toFunction(value, { fnName, paramName: `patcher.${key}` })
        : value,
      isFunction,
    ])
  }

  return input => {
    if (!isPlainObject(input)) {
      throw new TypeError(
        `@asd14/m/${fnName}: expected '${inputName}' to be 'Object', got '${type(input)}'`
      )
    }

    const result: PlainObject = { ...input }

    for (let index = 0, length = entries.length; index < length; index++) {
      const [key, value, isFunction] = entries[index]!

      if (isTransformOnly && !Object.hasOwn(input, key)) {
        continue
      }

      _setOwn(
        result,
        key,
        // An own value only: a key the input lacks, eg. toString, gives
        // undefined, not the value Object.prototype has
        isFunction
          ? (value as AnyMorphism)(
              Object.hasOwn(input, key) ? input[key] : undefined,
              input
            )
          : value
      )
    }

    return result
  }
}

export { _buildPatch }
export type { BuildPatchOptions }
