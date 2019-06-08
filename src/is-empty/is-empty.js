import { type } from "../type/type"

/**
 * Check if variable is considered empty
 *
 * @param   {Any}      source  Source input
 *
 * @return  {boolean}  True if empty, False otherwise
 *
 * @tag Core
 * @signature (source: any): boolean
 *
 * @example
 * isEmpty({})               // true
 * isEmpty(1)                // false
 * isEmpty(false)            // false
 * isEmpty("")               // true
 * isEmpty(null)             // true
 * isEmpty(undefined)        // true
 * isEmpty([])               // true
 * isEmpty(NaN)              // true
 * isEmpty(/[A-z]/)          // false
 * isEmpty(new Date())       // false
 * isEmpty(() => {})         // false
 * isEmpty(Promise.resolve() // false
 */
const isEmpty = source => {
  const sourceType = type(source)
  const byType = {
    Null: () => true,
    Undefined: () => true,
    Number: () => Number.isNaN(source),
    String: () => source === "",
    Array: () => source.length === 0,
    Object: () => Object.keys(source).length === 0,
  }

  return byType[sourceType] ? byType[sourceType]() : false
}

export { isEmpty }
