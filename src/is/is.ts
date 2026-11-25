/**
 * Test if a value is not null, undefined, or NaN.
 *
 * @param {unknown} input - Value to test
 *
 * @returns {boolean} True if not null, undefined, or NaN
 *
 * @example
 * isSomething(null)      // => false
 * isSomething(0)         // => true
 * isSomething(undefined) // => false
 * isSomething("")        // => true
 * isSomething(false)     // => true
 * isSomething(NaN)       // => false
 *
 * @name isSomething
 * @tag Type guard
 */
const isSomething = <T>(input: T): input is Exclude<T, null | undefined> =>
  input !== null && input !== undefined && !Number.isNaN(input)

/**
 * Test if a value is null, undefined, or NaN.
 *
 * @param {unknown} input - Value to test
 *
 * @returns {boolean} True if null, undefined, or NaN
 *
 * @example
 * isNothing(null)      // => true
 * isNothing(0)         // => false
 * isNothing(undefined) // => true
 * isNothing("")        // => false
 * isNothing(false)     // => false
 * isNothing(NaN)       // => true
 *
 * @name isNothing
 * @tag Type guard
 * @alias isNil
 */
const isNothing = <T>(input: T): input is T & (null | undefined) =>
  input === null || input === undefined || Number.isNaN(input)

/**
 * Test if a value is a plain object: its prototype is `Object.prototype` or
 * `null`. An array, a `Date`, a `Map` or a class instance is not.
 *
 * @param {unknown} input - Value to test
 *
 * @returns {boolean} True if a plain object
 *
 * @example
 * isPlainObject({})                  // => true
 * isPlainObject(Object.create(null)) // => true
 * isPlainObject([])                  // => false
 * isPlainObject(new Date())          // => false
 * isPlainObject(null)                // => false
 *
 * @name isPlainObject
 * @tag Type guard
 */
const isPlainObject = (input: unknown): input is Record<string, unknown> => {
  if (input === null || input === undefined) {
    return false
  }

  const prototype: unknown = Object.getPrototypeOf(input)

  return prototype === Object.prototype || prototype === null
}

/**
 * Test if a value is strictly `true`.
 *
 * @param {unknown} input - Value to test
 *
 * @returns {boolean} True if input is strictly true
 *
 * @example
 * isTrue(true)  // => true
 * isTrue(false) // => false
 * isTrue("")    // => false
 *
 * @name isTrue
 * @tag Type guard
 */
const isTrue = (input: unknown): input is true => input === true

/**
 * Test if a value is strictly `false`.
 *
 * @param {unknown} input - Value to test
 *
 * @returns {boolean} True if input is strictly false
 *
 * @example
 * isFalse(false) // => true
 * isFalse(true)  // => false
 * isFalse("")    // => false
 *
 * @name isFalse
 * @tag Type guard
 */
const isFalse = (input: unknown): input is false => input === false

/**
 * Test if a value is a number (excludes NaN).
 *
 * @param {unknown} input - Value to test
 *
 * @returns {boolean} True if a number and not NaN
 *
 * @example
 * isNumber(42)        // => true
 * isNumber(3.14)      // => true
 * isNumber(NaN)       // => false
 * isNumber("42")      // => false
 * isNumber(Infinity)  // => true
 *
 * @name isNumber
 * @tag Type guard
 */
const isNumber = (input: unknown): input is number =>
  typeof input === "number" && !Number.isNaN(input)

/**
 * Test if a value is a string.
 *
 * @param {unknown} input - Value to test
 *
 * @returns {boolean} True if a string
 *
 * @example
 * isString("hello") // => true
 * isString("")      // => true
 * isString(42)      // => false
 * isString(null)    // => false
 *
 * @name isString
 * @tag Type guard
 */
const isString = (input: unknown): input is string => typeof input === "string"

/**
 * Test if a value is a boolean.
 *
 * @param {unknown} input - Value to test
 *
 * @returns {boolean} True if a boolean
 *
 * @example
 * isBoolean(true)  // => true
 * isBoolean(false) // => true
 * isBoolean(0)     // => false
 * isBoolean("")    // => false
 *
 * @name isBoolean
 * @tag Type guard
 */
const isBoolean = (input: unknown): input is boolean =>
  typeof input === "boolean"

/**
 * Test if a value is an array.
 *
 * @param {unknown} input - Value to test
 *
 * @returns {boolean} True if an array
 *
 * @example
 * isArray([1, 2])  // => true
 * isArray([])      // => true
 * isArray("hello") // => false
 * isArray({})      // => false
 *
 * @name isArray
 * @tag Type guard
 */
const isArray = (input: unknown): input is unknown[] => Array.isArray(input)

/**
 * Test if a value is a function.
 *
 * @param {unknown} input - Value to test
 *
 * @returns {boolean} True if a function
 *
 * @example
 * isFunction(() => {})    // => true
 * isFunction(Math.max)    // => true
 * isFunction("hello")     // => false
 * isFunction(null)        // => false
 *
 * @name isFunction
 * @tag Type guard
 */
const isFunction = (
  input: unknown
): input is (...params: unknown[]) => unknown => typeof input === "function"

export {
  isSomething,
  isNothing,
  isNothing as isNil,
  isTrue,
  isFalse,
  isPlainObject,
  isNumber,
  isString,
  isBoolean,
  isArray,
  isFunction,
}
