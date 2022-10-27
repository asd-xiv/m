import test from "tape"

import { curry } from "./curry.js"

const sum = (a, b) => a + b

test("curry", t => {
  t.equal(
    curry(sum)(2, 3),
    5,
    "given [sum function, accepting two parameters, called with numeric values for both] should [return the sum of passed values]"
  )

  t.equal(
    curry(sum)(2)(3),
    5,
    "given [sum function, accepting two parameters, called with numeric values in curried form] should [return the sum of passed values]"
  )

  t.equal(
    curry(sum)()(),
    Number.NaN,
    "given [sum function, accepting two parameters, called with no parameters two times in curried form] should [return NaN]"
  )

  t.end()
})
