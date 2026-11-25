import test from "tape"

import { escapeRegExp } from "./escape-reg-exp.js"

test("escapeRegExp - uncurried", t => {
  t.equal(
    escapeRegExp("lorem. ipsum [dolor] (sit amet)?"),
    "lorem\\. ipsum \\[dolor\\] \\(sit amet\\)\\?",
    "given [string with (, ), [, ], ?, . chars] should [escape each special char]"
  )

  t.equal(
    escapeRegExp("Alice + Bob = $orry | A < B | f* => {}"),
    "Alice \\+ Bob = \\$orry \\| A < B \\| f\\* => \\{\\}",
    "given [string with +, $, |, <, >, *, {, } chars] should [escape each special char]"
  )

  t.equal(
    escapeRegExp("a-z"),
    "a\\-z",
    "given [a string with a dash] should [escape -]"
  )

  t.true(
    new RegExp(`^[${escapeRegExp("a-z")}]+$`, "u").test("a-z") &&
      !new RegExp(`^[${escapeRegExp("a-z")}]$`, "u").test("b"),
    "given [an escaped string in a character class with the u flag] should [match its characters only, not a range]"
  )

  t.true(
    new RegExp(escapeRegExp("a<b>"), "u").test("a<b>"),
    "given [a string with < and > and the u flag] should [build a valid RegExp]"
  )

  t.equal(
    escapeRegExp("a^b"),
    "a\\^b",
    "given [string with caret] should [escape ^]"
  )

  t.equal(
    escapeRegExp("back\\slash"),
    "back\\\\slash",
    "given [string with backslash] should [escape \\]"
  )

  t.equal(
    escapeRegExp("plain text"),
    "plain text",
    "given [string without special chars] should [return the string unchanged]"
  )

  t.end()
})

test("escapeRegExp - invalid input", t => {
  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      escapeRegExp(42)
    },
    /expected 'input' to be 'String', got 'Number'/,
    "given [a number as input] should [throw TypeError]"
  )

  t.end()
})
