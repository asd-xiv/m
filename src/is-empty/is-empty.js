import { type } from "../type/type"

const byType = {
  Null: () => true,
  Undefined: () => true,
  Number: source => Number.isNaN(source),
  String: source => source === "",
  Array: source => source.length === 0,
  Object: source => Object.keys(source).length === 0,
}

/**
 * Check if variable is considered empty
 *
 * @param {any} source Source input
 *
 * @returns {boolean} True if empty, False otherwise
 *
 * @tag Core
 * @signature (source: any): boolean
 *
 * @example
 * isEmpty({})                // true
 * isEmpty(1)                 // false
 * isEmpty(false)             // false
 * isEmpty("")                // true
 * isEmpty(null)              // true
 * isEmpty(undefined)         // true
 * isEmpty([])                // true
 * isEmpty(NaN)               // true
 * isEmpty(/[A-z]/)           // false
 * isEmpty(new Date())        // false
 * isEmpty(() => {})          // false
 * isEmpty(Promise.resolve()) // false
 */
export const isEmpty = source => {
  const sourceType = type(source)

  return byType[sourceType] ? byType[sourceType](source) : false
}

export const isNotEmpty = source => !isEmpty(source)
