/**
 * Get list with names of all own properties
 *
 * @param {Array|Object} source Array or Object to extract values from
 *
 * @returns {string[]} List of property names
 *
 * @name values
 * @tag Array,Object
 * @signature (source: Array|Object): string[]
 *
 * @example
 * values(["lorem", "ipsum"])
 * // => ["lorem", "ipsum"]
 *
 * values({ foo: "bar", lorem: "ipsum"})
 * // => ["bar", "ipsum"]
 *
 * values("foo"), values(12), values(null), etc
 * // => []
 */
export const values = source => {
  const type = Array.isArray(source)
    ? "array"
    : source !== null && typeof source === "object"
    ? "object"
    : "other"

  switch (type) {
    case "array": {
      return source
    }
    case "object": {
      const entries = Object.entries(source)
      const result = []

      for (const entry of entries) {
        result.push(entry[1])
      }

      return result
    }
    default:
      return []
  }
}
