const test = require("tape")
const isEmpty = require("./is-empty")

/**
 * Determines something is empty
 *
 * @param   {Any}      input  Something to check if empty
 *
 * @return  {boolean}  True if empty, False otherwise
 *
 * @example
 *
 * isEmpty({})               // true
 * isEmpty(1)                // false
 * isEmpty(false)            // false
 * isEmpty("")               // true
 * isEmpty(null)             // true
 * isEmpty(undefined)        // true
 * isEmpty([])               // true
 * isEmpty(NaN)              // true
 * isEmpty(/[A-z]/)          // false
 * isEmpty(new Date())       // false
 * isEmpty(() => {})         // false
 * isEmpty(Promise.resolve() // false
 */
test("core::isEmpty( input ): boolean", t => {
  t.equal(isEmpty({}), true, "{} should equal true")
  t.equal(isEmpty({ a: 2 }), false, "{a:2} should equal false")
  t.equal(isEmpty([]), true, "[] should equal true")
  t.equal(isEmpty([2]), false, "[2] should equal false")
  t.equal(isEmpty(""), true, '"" should equal true')
  t.equal(isEmpty("2"), false, '"2" should equal false')
  t.equal(isEmpty(2), false, "2 should equal false")
  t.equal(isEmpty(NaN), true, "NaN should equal true")
  t.equal(isEmpty(null), true, "null should equal true")
  t.equal(isEmpty(undefined), true, "undefined should equal true")
  t.equal(isEmpty(() => {}), false, "() => {} should equal false")
  t.equal(isEmpty(new Date()), false, "Date() should equal false")
  t.equal(isEmpty(Promise.resolve(2)), false, "Promise() should equal false")
  t.end()
})
