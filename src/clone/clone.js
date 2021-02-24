import { map } from "../map/map"
import { reduce } from "../reduce/reduce"
import { type } from "../type/type"

/**
 * Creates a new instance of the object with same properties than original.
 * Will not inherit prototype, only own enumerable properties.
 *
 * @param {any} source Source input value
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
export const clone = source => {
  const sourceType = type(source)

  if (sourceType === "Array") {
    return map(clone, source)
  }

  if (sourceType === "Object") {
    return reduce(
      (acc, [key, elm]) => {
        acc[key] = clone(elm)

        return acc
      },
      {},
      Object.entries(source)
    )
  }

  if (sourceType === "Date") {
    return new Date(source.getTime())
  }

  if (sourceType === "RegExp") {
    return new RegExp(sourceType.toString())
  }

  return source
}
