import test from "tape"
import { is, isNothing } from ".."

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
test("core::is", t => {
  t.equal(is(false), true, 'Is "false" something')
  t.equal(is(0), true, `Is "0" something`)
  t.equal(is(""), true, "Is empty-string something")
  t.equal(is(null), false, 'Is "null" something')
  t.equal(is(undefined), false, 'Is "undefined" something')
  t.equal(is(NaN), false, 'Is "NaN" something')

  t.equal(isNothing(false), false, '"false" is something')
  t.equal(isNothing(0), false, `"0" is something`)
  t.equal(isNothing(""), false, "Empty-string is something")
  t.equal(isNothing(null), true, '"null" is nothing')
  t.equal(isNothing(undefined), true, '"undefined" is nothing')
  t.equal(isNothing(NaN), true, '"NaN" is nothing')

  t.end()
})
