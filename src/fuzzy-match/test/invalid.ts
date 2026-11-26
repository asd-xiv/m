import test from "tape"

import { fuzzyMatch } from "../fuzzy-match.js"

test("fuzzyMatch - invalid", t => {
  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      fuzzyMatch(1, "text")
    },
    /expected 'query' to be 'String', got 'Number'/,
    "given [a number as query] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      fuzzyMatch("a", null)
    },
    /expected 'text' to be 'String', got 'Null'/,
    "given [null as text] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      fuzzyMatch("a")(1)
    },
    /expected 'text' to be 'String', got 'Number'/,
    "given [a number as text, curried] should [throw TypeError]"
  )

  t.end()
})
