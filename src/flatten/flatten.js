import { reduce } from "../reduce/reduce.js"
import { is, isObject } from "../is/is.js"

const flattenArray = reduce(
  (acc, item) =>
    Array.isArray(item) ? [...acc, ...flattenArray(item)] : [...acc, item],
  []
)

const flattenObject = (input, prefix) =>
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
  }, {})(Object.entries(input))

/**
 * Recursively concat all arrays intro a single array
 *
 * @param {Array|Object} input Array or Object to flatten
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
const flatten = input => {
  if (Array.isArray(input)) {
    return flattenArray(input)
  }

  if (typeof input === "object") {
    return flattenObject(input)
  }

  return input
}

export { flatten }
