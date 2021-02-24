import { curry } from "../curry/curry"

/**
 * Test if something is not null, undefined or NaN
 *
 * @param {any} source Source variable
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
const is = source =>
  source !== null && source !== undefined && !Number.isNaN(source)

const isNothing = source =>
  source === null || source === undefined || Number.isNaN(source)

const isObject = source =>
  source !== null && typeof source === "object" && !Array.isArray(source)

const isTrue = source => source === true

const isFalse = source => source === false

const not = curry((fn, source) => !fn(source))

export { is, not, isNothing, isTrue, isFalse, isObject }
