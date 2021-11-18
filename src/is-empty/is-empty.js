import { type } from "../type/type.js"

const byType = {
  Null: () => true,
  Undefined: () => true,
  Number: input => Number.isNaN(input),
  String: input => input === "",
  Array: input => input.length === 0,
  Object: input => Object.keys(input).length === 0,
}

/**
 * Check if variable is considered empty
 *
 * @param {any} input Source input
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
export const isEmpty = input => {
  const inputType = type(input)

  return byType[inputType] ? byType[inputType](input) : false
}

export const isNotEmpty = input => !isEmpty(input)
