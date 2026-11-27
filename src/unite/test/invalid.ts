import test from "tape"

import { unite } from "../unite.js"

test("unite - invalid", t => {
  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => unite(42, [1]),
    /expected 'a' to be 'Array', got 'Number'/,
    "given [a number as first array] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => unite([1], "abc"),
    /expected 'b' to be 'Array', got 'String'/,
    "given [a string as second array] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => unite([1])(null),
    /expected 'b' to be 'Array', got 'Null'/,
    "given [null as second array, curried] should [throw TypeError]"
  )

  t.end()
})
