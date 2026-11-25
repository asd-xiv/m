import test from "tape"

import { _pipe } from "./pipe.js"

const increment = (input: number): number => input + 1
const double = (input: number): number => input * 2

test("_pipe - valid", t => {
  t.equal(
    _pipe([increment, double])(1),
    4,
    "given [two functions] should [compose them left to right]"
  )

  t.equal(_pipe([increment])(1), 2, "given [one function] should [apply it]")

  t.end()
})

test("_pipe - edge", t => {
  t.throws(
    () => _pipe([])(1),
    TypeError,
    "given [an empty array] should [throw, the caller checks first]"
  )

  t.end()
})

test("_pipe - invalid input", t => {
  t.throws(
    // @ts-expect-error -- testing that nothing is checked
    () => _pipe([1])(1),
    TypeError,
    "given [a non function] should [throw the native error, no check]"
  )

  t.end()
})
