import { map } from "../map/map.js"

/**
 * @param {Object} mappings
 * @param {Object} input
 *
 * @returns {Object}
 */
const _renameOne = (mappings, input) => {
  const entries = Object.entries(mappings)
  const result = { ...input }

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
 * @param {Object}            mappings
 * @param {Object | Object[]} input
 *
 * @returns {Object | Object[]}
 */
const _renameMany = (mappings, input) =>
  map(item => _renameOne(mappings, item), input)

/**
 * Rename keys inside an object
 *
 * @param {...any} params
 *
 * @returns {Object | Object[]}
 *
 * @name renameKeys
 * @tag Object
 * @signature (mappings: object) => (input: object) => object
 * @signature (mappings: object, input: object) => object
 *
 * @example
 * rename({ old: "new" }, { old: 42 })
 * // => { new: 42 }
 *
 * rename({ old: "new" }, [{ old: 42 }, { old: 41 }])
 * // => [{ new: 42 }, { new: 41 }]
 */
export const rename = (...params) => {
  // @signature (mappings) => (input)
  if (params.length <= 1) {
    return input => _renameOne(params[0], input)
  }

  // @signature (mappings, input)
  return _renameOne(...params)
}

export const renameMany = (...params) => {
  // @signature (mappings) => (input)
  if (params.length <= 1) {
    return input => _renameMany(params[0], input)
  }

  // @signature (mappings, input)
  return _renameMany(...params)
}
