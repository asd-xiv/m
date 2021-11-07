import { is } from "../is/is.js"
import { map } from "../map/map.js"
import { filter } from "../filter/filter.js"
import { type } from "../type/type.js"

const _compactObject = input => {
  const result = { ...input }
  const keys = Object.keys(result)

  for (const key of keys) {
    if (!is(result[key])) {
      delete result[key]
    }
  }

  return result
}

const _compactArray = input => filter(is, input)

/**
 * Returns a copy of the object or array with all null or undefined values
 * removed.
 *
 * @param {Array|Object} input
 *
 * @returns {Array|Object}
 *
 * @name compact
 * @tag Array,Object
 * @signature (source: Array|Object): Array|Object
 *
 * @see {@link compactMany}
 * @see {@link is}
 *
 * @example
 * compact([1, null, undefined, {}])
 * // => [1, {}]
 *
 * compact({
 *   a: "Lorem Ipsum",
 *   b: null,
 *   c: undefined,
 *   d: false,
 *   f: lambda,
 *  }),
 * // => {
 * //  a: "Lorem Ipsum",
 * //  d: false,
 * //  f: lambda
 * // }
 */
export const compact = input => {
  const inputType = type(input)

  switch (inputType) {
    case "Array":
      return _compactArray(input)

    case "Object":
      return _compactObject(input)

    default:
      return input
  }
}

export const compactMany = map(compact)
