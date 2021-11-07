/**
 * Get list with names of all own properties
 *
 * @param {Array|Object} input Array or Object to extract values from
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
export const values = input => {
  const type = Array.isArray(input)
    ? "array"
    : input !== null && typeof input === "object"
    ? "object"
    : "other"

  switch (type) {
    case "array": {
      return [...input]
    }
    case "object": {
      const entries = Object.entries(input)
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
