/* eslint-disable unicorn/no-null */

import test from "tape"
import { type } from "./type"

test("type", t => {
  t.equal(type(null), "Null", "null should equal Null")
  t.equal(type(), "Undefined", "undefined should equal Undefined")
  t.equal(type(Number.NaN), "Number", "NaN should equal Number")
  t.equal(type(false), "Boolean", "false should equal Boolean")
  t.equal(type(2), "Number", "2 should equal Number")
  t.equal(type(""), "String", '"" should equal String')
  t.equal(type([]), "Array", "[] should equal Array")
  t.equal(type({}), "Object", "{} should equal Object")
  t.equal(type(new Date()), "Date", "new Date() should equal Date")
  t.equal(
    type(() => {}),
    "Function",
    "() => {} should equal Function"
  )
  t.equal(type(/[A-z]/), "RegExp", "/[A-z]/ should equal RegExp")
  t.equal(
    type(Promise.resolve(2)),
    "Promise",
    "Promise.resolve(2) should equal Promise"
  )
  t.end()
})
