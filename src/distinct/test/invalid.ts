import test from "tape"

import { distinct } from "../distinct.js"

test("distinct - invalid", t => {
  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      distinct(42)
    },
    /expected 'input' to be 'Array', got 'Number'/,
    "given [a number as input] should [throw TypeError]"
  )

  t.end()
})
