import test from "tape"

import { uniteBy } from "../unite-by.js"

type Item = { id: number; v: string }

const byId = (a: Item, b: Item) => a.id === b.id

test("uniteBy - invalid", t => {
  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => uniteBy(byId),
    /expected 'a' to be 'Array', got 'Undefined'/,
    "given [the removed (fn) form] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => uniteBy("not a function", [], []),
    /expected 'fn' to be 'Function', got 'String'/,
    "given [a string as equality function] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => uniteBy(byId, 42, []),
    /expected 'a' to be 'Array', got 'Number'/,
    "given [a number as first array] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => uniteBy(byId, [], "abc"),
    /expected 'b' to be 'Array', got 'String'/,
    "given [a string as second array] should [throw TypeError]"
  )

  t.end()
})
