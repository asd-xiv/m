import test from "tape"

import { first } from "./first.js"

test("first", t => {
  t.equal(first("xyz"), "x", "From string should return first char")
  t.equal(first([1, 2, 3]), 1, "From number array should return first element")
  t.equal(first([]), undefined, "From empty array should return undefined")
  t.equal(first(2), undefined, "From number should return undefined")
  t.equal(first({}), undefined, "From object should return undefined")
  t.equal(
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    first(() => {}),
    undefined,
    "From function should return undefined"
  )

  t.end()
})
