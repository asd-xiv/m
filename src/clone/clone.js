import { map } from "../map/map.js"
import { reduce } from "../reduce/reduce.js"
import { type } from "../type/type.js"

/**
 * Creates a new instance of the object with same properties than original.
 * Will not inherit prototype, only own enumerable properties.
 *
 * @param {any} input Source input value
 *
 * @returns {any} New instance of source
 *
 * @name clone
 * @tag Core
 * @signature (source: Any): Any
 *
 * @see {@link deepEqual}
 *
 * @example
 * let x = {a: [1]}
 *
 * clone(x)
 * // => {a: [1]}
 *
 * close(x) === x
 * // => false
 */
export const clone = input => {
  const inputType = type(input)

  if (inputType === "Array") {
    return map(clone, input)
  }

  if (inputType === "Object") {
    return reduce(
      (acc, [key, elm]) => {
        acc[key] = clone(elm)

        return acc
      },
      {},
      Object.entries(input)
    )
  }

  if (inputType === "Date") {
    return new Date(input.getTime())
  }

  if (inputType === "RegExp") {
    return new RegExp(inputType.toString())
  }

  return input
}
