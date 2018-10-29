/**
 * Test if something is not `null` or `undefined`
 *
 * @tag Core
 * @signature is(source): boolean
 *
 * @param {any} source Source variable
 *
 * @return {boolean}
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
module.exports = source =>
  source !== null && source !== undefined && !Number.isNaN(source)
