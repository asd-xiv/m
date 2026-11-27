import test from "tape"

import { isDeepEqual } from "../is-deep-equal.js"

test("isDeepEqual - invalid", t => {
  t.equal(
    isDeepEqual(1, {}),
    false,
    "given [a number and an object] should [return false]"
  )
  t.equal(
    isDeepEqual({}, 1),
    false,
    "given [a number and an object] should [return false]"
  )

  t.equal(
    isDeepEqual(() => 1, {}),
    false,
    "given [a function and an object] should [return false]"
  )

  t.equal(
    isDeepEqual(Symbol("a"), Symbol("a")),
    false,
    "given [a Symbol and the same description] should [return false]"
  )

  t.equal(
    isDeepEqual("a", new Object("a")),
    false,
    "given [a string and a String object] should [return false]"
  )

  t.equal(
    isDeepEqual({ a: NaN, b: 1 }, { a: NaN, b: 2 }),
    false,
    "given [two NaN inside objects with a different sibling] should [return false]"
  )

  t.end()
})
