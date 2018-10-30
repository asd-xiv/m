const i = require("../i/i")
const type = require("../type/type")

/**
 * Creates a new instance of the object with same properties than original
 *
 * @param  {T}  source  Variable to clone
 *
 * @return {T}
 *
 * @tag Coore
 * @signature (source: T): T
 *
 * @example
 * clone([1])
 * // => [1]
 * clone({a: [1]})
 * // => {a: [1]}
 */
const clone = source => {
  const byType = {
    Number: i,
    String: i,
    Boolean: i,
    Function: i,
    Null: () => null,
    Undefined: () => undefined,
    Date: () => new Date(source.getTime()),
    Array: () => {
      const result = []

      for (let j = 0, length = source.length - 1; j <= length; j++) {
        result.push(clone(source[j]))
      }

      return result
    },
    Object: () => {
      const result = {}
      const sourceEntries = Object.entries(source)

      for (let j = 0, length = sourceEntries.length - 1; j <= length; j++) {
        const [key, value] = sourceEntries[j]

        result[key] = clone(value)
      }

      return result
    },
  }

  return byType[type(source)](source)
}

module.exports = clone
