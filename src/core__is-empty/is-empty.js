const type = require("../core__type/type")

/**
 * Determines something is empty
 *
 * @param   {Any}      input  Something to check if empty
 *
 * @return  {boolean}  True if empty, False otherwise
 *
 * @example
 *
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
module.exports = input => {
  const inputType = type(input)
  const byType = {
    Null: () => true,
    Undefined: () => true,
    Number: () => Number.isNaN(input),
    String: () => input === "",
    Array: () => input.length === 0,
    Object: () => Object.keys(input).length === 0,
  }

  return byType[inputType] ? byType[inputType]() : false
}
