import { isPlainObject } from "../is/is.js"

type TypeFn = (input?: unknown) => string

/**
 * Single-word string description of the native type of a value.
 *
 * Returns capitalized type names: "Object", "Number", "Array", "Null", etc.
 * A class instance reports its class name, eg. "User". "Object" means a plain
 * object.
 *
 * @param {unknown} [input] - Value to check
 *
 * @returns {string} Capitalized type name
 *
 * @example
 * type({})                // => "Object"
 * type(null)              // => "Null"
 * type([1, 2])            // => "Array"
 * type(Promise.resolve()) // => "Promise"
 * type(new User())        // => "User"
 *
 * pipe(type, isEqual("Array"))([1, 2])
 * // => true
 *
 * @name type
 * @tag Any value
 */
const type: TypeFn = input => {
  if (input === null) return "Null"
  if (input === undefined) return "Undefined"

  const tag = Object.prototype.toString.call(input).slice(8, -1)

  if (tag !== "Object") return tag
  if (isPlainObject(input)) return "Object"

  // A class instance: name its class, eg. "User"
  const prototype = Object.getPrototypeOf(input) as { constructor?: unknown }

  return typeof prototype.constructor === "function" &&
    prototype.constructor.name !== ""
    ? prototype.constructor.name
    : "Object"
}

export { type }
export type { TypeFn }
