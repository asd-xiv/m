import test from "tape"

import { i } from "./i.js"

test("i - uncurried", t => {
  t.equal(i(42), 42, "given [a number] should [return the same number]")
  t.equal(
    i("hello"),
    "hello",
    "given [a string] should [return the same string]"
  )
  t.equal(i(null), null, "given [null] should [return null]")

  const object = { a: 1 }

  t.equal(
    i(object),
    object,
    "given [an object] should [return the same reference]"
  )

  t.end()
})
