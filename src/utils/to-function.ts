import { _pipe } from "./pipe.js"
import type { AnyMorphism } from "../../types/function.js"

import { type } from "../type/type.js"

type ToFunctionOptions = {
  /** The public function to name in the error, eg. `filter` */
  fnName: string
  /** The parameter to name in the error, eg. `fn` or `patcher.tags` */
  paramName: string
}

/**
 * Turn the value of a function slot into a function: pass a function through,
 * and compose a pipe array into one. An error names the public function and
 * its parameter, eg. `@asd14/m/filter: expected 'fn[1]' to be 'Function'`.
 *
 * @example
 * _toFunction([read("id"), isEqual(1)], { fnName: "filter", paramName: "fn" })({ id: 1 })
 * // => true
 *
 * _toFunction([read("id"), 1], { fnName: "filter", paramName: "fn" })
 * // throws "@asd14/m/filter: expected 'fn[1]' to be 'Function', got 'Number'"
 */
const _toFunction = (
  fn: unknown,
  { fnName, paramName }: ToFunctionOptions
): AnyMorphism => {
  if (typeof fn === "function") {
    return fn as AnyMorphism
  }

  if (!Array.isArray(fn)) {
    throw new TypeError(
      `@asd14/m/${fnName}: expected '${paramName}' to be 'Function' or 'Array', got '${type(fn)}'`
    )
  }

  if (fn.length === 0) {
    throw new TypeError(
      `@asd14/m/${fnName}: expected '${paramName}' to be 'NonEmpty', got 'Empty'`
    )
  }

  for (let index = 0, length = fn.length; index < length; index++) {
    if (typeof fn[index] !== "function") {
      throw new TypeError(
        `@asd14/m/${fnName}: expected '${paramName}[${index}]' to be 'Function', got '${type(fn[index])}'`
      )
    }
  }

  // Each item is a function, checked above
  return _pipe(fn as AnyMorphism[])
}

export { _toFunction }
export type { ToFunctionOptions }
