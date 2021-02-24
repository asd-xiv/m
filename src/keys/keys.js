/**
 * Get list with names of all own properties
 *
 * @param {Array|Object} source Array or Object to extract keys from
 *
 * @returns {string[]} List of property names
 *
 * @name keys
 * @tag Array,Object
 * @signature (source: Array|Object): string[]
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
export const keys = source => {
  const type = Array.isArray(source)
    ? "array"
    : source !== null && typeof source === "object"
    ? "object"
    : "other"

  switch (type) {
    case "object":
    case "array": {
      const entries = Object.entries(source)
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
