import { i } from "../i/i"
import { map } from "../map/map"
import { reduce } from "../reduce/reduce"
import { type } from "../type/type"

/**
 * Creates a new instance of the object with same properties than original.
 * Will not inherit prototype, only own enumerable properties.
 *
 * @name       clone
 * @tag        Core
 * @signature  <T>(source: T): T
 * @see        {@link deepEqual}
 *
 * @param  {any}  source  Input value
 *
 * @returns  {any}  Cloned value
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
const clone = source => {
  const byType = {
    Date: () => new Date(source.getTime()),
    Array: () => map(clone)(source),
    Object: () =>
      reduce((acc, [key, elm]) => {
        acc[key] = clone(elm)

        return acc
      }, {})(Object.entries(source)),
  }

  const sourceType = type(source)

  return byType[sourceType] ? byType[sourceType](source) : i(source)
}

export { clone }
