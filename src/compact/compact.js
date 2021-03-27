import { is } from "../is/is"
import { map } from "../map/map"
import { filter } from "../filter/filter"
import { curry } from "../curry/curry"
import { type } from "../type/type"

const _compactObject = source => {
  const result = { ...source }
  const keys = Object.keys(result)

  for (const key of keys) {
    if (!is(result[key])) {
      delete result[key]
    }
  }

  return result
}

const _compactArray = source => filter(is, source)

const _compact = source => {
  const sourceType = type(source)

  switch (sourceType) {
    case "Array":
      return _compactArray(source)

    case "Object":
      return _compactObject(source)

    default:
      return source
  }
}

const _compactMany = map(_compact)

/**
 * Returns a copy of the object or array
 * with all null or undefined values removed
 *
 * @param {Array|Object} source
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
export const compact = curry(_compact)

export const compactMany = curry(_compactMany)
