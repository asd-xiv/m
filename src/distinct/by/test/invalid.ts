import test from "tape"

import { distinctBy } from "../distinct-by.js"

test("distinctBy - invalid", t => {
  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      distinctBy(42, [1, 2])
    },
    /expected 'fn' to be 'Function', got 'Number'/,
    "given [a number as fn] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      distinctBy((a: number, b: number) => a === b, "not-an-array")
    },
    /expected 'input' to be 'Array', got 'String'/,
    "given [a string as input] should [throw TypeError]"
  )

  t.end()
})
