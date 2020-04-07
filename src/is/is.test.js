import test from "tape"
import { is, isNothing, isTrue, not, isFalse, isObject } from ".."

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

  t.equal(not(is)(NaN), true, '"NaN" is not something')

  t.equal(isTrue(""), false, "empty string is not true")
  t.equal(isTrue(true), true, "boolean value true is true")

  t.equal(isFalse(""), false, "empty string is not false")
  t.equal(isFalse(false), true, "boolean value false is false")

  t.equal(isNothing(false), false, '"false" is something')
  t.equal(isNothing(0), false, `"0" is something`)
  t.equal(isNothing(""), false, "Empty-string is something")
  t.equal(isNothing(null), true, '"null" is nothing')
  t.equal(isNothing(undefined), true, '"undefined" is nothing')
  t.equal(isNothing(NaN), true, '"NaN" is nothing')

  t.equal(isObject(null), false, "null is not object")
  t.equal(isObject({}), true, "{} is object")
  t.equal(isObject([]), false, "[] is not object")
  t.equal(isObject("lorem"), false, "string is not object")

  t.end()
})
