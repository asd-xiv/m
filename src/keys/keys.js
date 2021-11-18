/**
 * Get list with names of all own properties
 *
 * @param {Array|Object} input Array or Object to extract keys from
 *
 * @returns {string[]} List of property names
 *
 * @name keys
 * @tag Array,Object
 * @signature (input: Array|Object): string[]
 *
 * @example
 * keys(["lorem", "ipsum"])
 * // => ["0", "1"]
 *
 * keys({ foo: "bar", lorem: "ipsum"})
 * // => ["foo", "lorem"]
 *
 * keys("foo"), keys(12), keys(null), etc
 * // => []
 */
export const keys = input => {
  const type = Array.isArray(input)
    ? "array"
    : input !== null && typeof input === "object"
    ? "object"
    : "other"

  switch (type) {
    case "object":
    case "array": {
      const entries = Object.entries(input)
      const result = []

      for (const entry of entries) {
        result.push(entry[0])
      }

      return result
    }
    default:
      return []
  }
}
