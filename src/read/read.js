import { reduce } from "../reduce/reduce.js"
import { is } from "../is/is.js"
import { pipe } from "../pipe/pipe.js"
import { map } from "../map/map.js"

const _read = (path, defaultValue, input) => {
  let result

  // walk down an object or array
  if (is(input) && typeof input === "object") {
    result = pipe(
      reduce(
        (acc, item) =>
          is(acc) && typeof acc === "object" ? acc[item] : undefined,
        input
      ),

      // only return default value if it's explicitly set.
      // this way values of "null", "NaN" are not masked
      value =>
        value === undefined && defaultValue !== undefined ? defaultValue : value
    )(Array.isArray(path) ? path : [path])
  }

  return result === undefined && defaultValue !== undefined
    ? defaultValue
    : result
}

const _readMany = (path, defaultValue, input) =>
  map(item => _read(path, defaultValue, item), input)

/**
 * Get value from obj property
 *
 * @param {string|string[]} path         Property name or dot path of props
 * @param {any}             defaultValue Value to return if not found
 * @param {Object}          input        Source object
 * @param {...any}          params       Function params
 *
 * @returns {any}
 *
 * @name read
 * @tag Object
 * @signature (path: String|String[], input: Object|Array): any
 * @signature (path: String|String[], defaultValue: Any, input: Object|Array): any
 *
 * @example
 * read("lorem")({ lorem: "ipsum" })
 * // => "ipsum"
 *
 * read("not-exist")({ lorem: "ipsum" })
 * // => undefined
 *
 * read("not-exist-with-default", "dolor", { lorem: "ipsum" })
 * // => "dolor"
 *
 * read(["a", "b"])({ a: { b: "c" } })
 * // => "c"
 *
 * read(["a", "test"])({ a: { b: "c" } })
 * // => undefined
 */
export const read = (...params) => {
  if (params.length <= 2) {
    return input => _read(params[0], params[1], input)
  }

  return _read(...params)
}

export const readMany = (...params) => {
  if (params.length <= 2) {
    return input => _readMany(params[0], params[1], input)
  }

  return _readMany(...params)
}
