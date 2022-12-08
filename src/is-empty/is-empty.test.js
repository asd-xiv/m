/* eslint-disable unicorn/no-null */

import test from "tape"

import { isEmpty, isNotEmpty } from "./is-empty.js"

test("isEmpty", t => {
  t.equal(isEmpty({}), true, "{} should equal true")
  t.equal(isEmpty({ a: 2 }), false, "{a:2} should equal false")
  t.equal(isEmpty([]), true, "[] should equal true")
  t.equal(isEmpty([2]), false, "[2] should equal false")
  t.equal(isEmpty(""), true, '"" should equal true')
  t.equal(isEmpty("2"), false, '"2" should equal false')
  t.equal(isEmpty(2), false, "2 should equal false")
  t.equal(isEmpty(Number.NaN), true, "NaN should equal true")
  t.equal(isEmpty(null), true, "null should equal true")
  t.equal(isEmpty(), true, "undefined should equal true")
  t.equal(
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    isEmpty(() => {}),
    false,
    "() => {} should equal false"
  )
  t.equal(isEmpty(new Date()), false, "Date() should equal false")
  t.equal(isEmpty(Promise.resolve(2)), false, "Promise() should equal false")
  t.end()
})

test("isNotEmpty", t => {
  t.equal(isNotEmpty({ a: 2 }), true, "{a:2} should equal true")
  t.equal(isNotEmpty({}), false, "{} should equal false")
  t.equal(isNotEmpty([2]), true, "[2] should equal true")
  t.equal(isNotEmpty([]), false, "[] should equal false")
  t.end()
})
