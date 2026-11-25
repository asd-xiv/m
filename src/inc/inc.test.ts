import test from "tape"

import { inc } from "./inc.js"

test("inc - uncurried", t => {
  t.equal(inc(0), 1, "given [0] should [return 1]")
  t.equal(inc(2), 3, "given [2] should [return 3]")
  t.equal(inc(-1), 0, "given [-1] should [return 0]")

  t.end()
})

test("inc - invalid input", t => {
  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      inc("1")
    },
    /expected 'input' to be 'Number', got 'String'/,
    "given [a string as input] should [throw TypeError]"
  )

  t.end()
})
