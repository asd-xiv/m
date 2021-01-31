import { reduce } from "../reduce/reduce"
import { is, isObject } from "../is/is"

const flattenArray = reduce(
  (acc, item) =>
    Array.isArray(item) ? [...acc, ...flattenArray(item)] : [...acc, item],
  []
)

const flattenObject = (source, prefix = null) =>
  reduce((acc, [key, value]) => {
    return isObject(value)
      ? {
          ...acc,
          ...flattenObject(value, is(prefix) ? `${prefix}__${key}` : key),
        }
      : {
          ...acc,
          [is(prefix) ? `${prefix}__${key}` : key]: value,
        }
  }, {})(Object.entries(source))

/**
 * Recursively concat all arrays intro a single array
 *
 * @param {Array | Object} source Array or Object to flatten
 *
 * @returns {Array} 1 level deep array
 *
 * @example
 * flatten([1, [2], [3, [4]]])
 * // => [1, 2, 3, 4]
 *
 * flatten({test: {a: 1, b: {c: 2}}})
 * // => {
 *  test__a: 1,
 *  test__b__c: 2
 * }
 */
const flatten = source => {
  if (Array.isArray(source)) {
    return flattenArray(source)
  }

  if (typeof source === "object") {
    return flattenObject(source)
  }

  return source
}

export { flatten }
