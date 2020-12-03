import { map } from "../map/map"

/**
 * @param {object} mappings
 * @param {object} source
 *
 * @returns {object}
 */
const _renameOne = (mappings, source) => {
  const entries = Object.entries(mappings)
  const result = { ...source }

  for (let i = 0, length = entries.length; i < length; ++i) {
    const [oldKey, newKey] = entries[i]

    if (result.hasOwnProperty(oldKey)) {
      result[newKey] = result[oldKey]
      delete result[oldKey]
    }
  }

  return result
}

/**
 * @param {object}          mappings
 * @param {object|object[]} source
 *
 * @returns {object|object[]}
 */
const _rename = (mappings, source) =>
  Array.isArray(source)
    ? map(item => _renameOne(mappings, item), source)
    : _renameOne(mappings, source)

/**
 * Rename keys inside an object
 *
 * @param {...any} params
 *
 * @returns {object|object[]}
 *
 * @name renameKeys
 * @tag Object
 * @signature (mappings: object) => (source: object) => object
 * @signature (mappings: object, source: object) => object
 *
 * @example
 * rename({ old: "new" }, { old: 42 })
 * // => { new: 42 }
 *
 * rename({ old: "new" }, [{ old: 42 }, { old: 41 }])
 * // => [{ new: 42 }, { new: 41 }]
 */
export const renameKeys = (...params) => {
  // @signature (mappings) => (source)
  if (params.length <= 1) {
    return source => _rename(params[0], source)
  }

  // @signature (mappings, source)
  return _rename(...params)
}
