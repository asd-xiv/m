import test from "tape"

import { intersectBy } from "../intersect-by.js"

type Item = { id: number; v: string }

const byId = (a: Item, b: Item) => a.id === b.id

test("intersectBy - invalid", t => {
  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => intersectBy(byId),
    /expected 'a' to be 'Array', got 'Undefined'/,
    "given [only the equality function] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => intersectBy("not a function", [], []),
    /expected 'fn' to be 'Function', got 'String'/,
    "given [a string as equality function] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => intersectBy(byId, 42, []),
    /expected 'a' to be 'Array', got 'Number'/,
    "given [a number as first array] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => intersectBy(byId, [], "abc"),
    /expected 'b' to be 'Array', got 'String'/,
    "given [a string as second array] should [throw TypeError]"
  )

  t.end()
})
