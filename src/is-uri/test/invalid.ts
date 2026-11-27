import test from "tape"

import { isURI } from "../is-uri.js"

test("isURI - invalid", t => {
  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      isURI(42)
    },
    /@asd14\/m\/isURI: expected 'input' to be 'String', got 'Number'/,
    "given [a number] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      isURI(null)
    },
    /expected 'input' to be 'String', got 'Null'/,
    "given [null] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      isURI()
    },
    /expected 'input' to be 'String', got 'Undefined'/,
    "given [no argument] should [throw TypeError]"
  )

  t.end()
})
