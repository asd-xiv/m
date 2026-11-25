import test from "tape"

import { toString } from "./to-string.js"

test("toString - valid input", t => {
  t.equal(
    toString(42),
    "42",
    "given [a number] should [return its string representation]"
  )

  t.equal(toString(0), "0", "given [zero] should [return '0']")

  t.equal(
    toString(true),
    "true",
    "given [a boolean] should [return its string representation]"
  )

  t.equal(toString(null), "null", "given [null] should [return 'null']")

  t.equal(
    toString(undefined),
    "undefined",
    "given [undefined] should [return 'undefined']"
  )

  t.equal(
    toString("hello"),
    "hello",
    "given [a string] should [return it unchanged]"
  )

  t.equal(toString(""), "", "given [empty string] should [return empty string]")

  t.end()
})
