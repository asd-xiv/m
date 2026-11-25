import test from "tape"

import { dec } from "./dec.js"

test("dec - uncurried", t => {
  t.equal(dec(0), -1, "given [0] should [return -1]")
  t.equal(dec(3), 2, "given [3] should [return 2]")
  t.equal(dec(-1), -2, "given [-1] should [return -2]")

  t.end()
})

test("dec - invalid input", t => {
  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      dec("1")
    },
    /expected 'input' to be 'Number', got 'String'/,
    "given [a string as input] should [throw TypeError]"
  )

  t.end()
})
