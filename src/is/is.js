import { curry } from "../curry/curry.js"

/**
 * Test if something is not null, undefined or NaN
 *
 * @param {any} input Source variable
 *
 * @returns {boolean}
 *
 * @tag Core
 * @signature is(source): boolean
 *
 * @example
 *
 * is(null)      // => false
 * is(0)         // => true
 * is(undefined) // => false
 * is("")        // => true
 * is(false)     // => true
 * is(NaN)       // => false
 */
const is = input =>
  input !== null && input !== undefined && !Number.isNaN(input)

const isNothing = input =>
  input === null || input === undefined || Number.isNaN(input)

const isObject = input =>
  input !== null && typeof input === "object" && !Array.isArray(input)

const isTrue = input => input === true

const isFalse = input => input === false

const not = curry((fn, input) => !fn(input))

export { is, not, isNothing, isTrue, isFalse, isObject }
