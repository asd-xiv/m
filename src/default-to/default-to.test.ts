import test from "tape"

import { defaultTo } from "./default-to.js"

test("defaultTo - uncurried", t => {
  t.equal(
    defaultTo(0, null),
    0,
    "given [null input] should [return default value]"
  )

  t.equal(
    defaultTo(0, undefined),
    0,
    "given [undefined input] should [return default value]"
  )

  t.equal(
    defaultTo(0, Number.NaN),
    0,
    "given [NaN input] should [return default value]"
  )

  t.equal(defaultTo("42", ""), "", 'given ["" input] should [return the input]')

  t.equal(defaultTo(42, 0), 0, "given [0 input] should [return the input]")

  t.equal(
    defaultTo(0, 42),
    42,
    "given [a valid value] should [return the input]"
  )

  t.equal(
    defaultTo(true, false),
    false,
    "given [false input] should [return false, not default]"
  )

  t.end()
})

test("defaultTo - curried", t => {
  t.equal(
    defaultTo(0)(null),
    0,
    "given [null input, curried] should [return default value]"
  )

  t.equal(
    defaultTo(0)(42),
    42,
    "given [a valid value, curried] should [return the input]"
  )

  t.end()
})
