import test from "tape"

import { pipe } from "./pipe.js"

const inc = (input: number): number => input + 1
const double = (input: number): number => input * 2

test("pipe - uncurried", t => {
  t.equals(
    pipe(inc)(3),
    4,
    "given [one function] should [return the result of that function]"
  )

  t.equals(
    pipe(inc, inc)(2),
    4,
    "given [two functions] should [compose left to right]"
  )

  t.equals(
    pipe(inc, double, inc)(2),
    7,
    "given [three functions] should [chain all results left to right]"
  )

  t.end()
})

test("pipe - invalid input", t => {
  t.throws(
    () => {
      // @ts-expect-error - intentional to test runtime throw
      pipe()(2)
    },
    /Error: @asd14\/m\/pipe: expected 'fns' to be 'NonEmpty', got 'Empty'/,
    "given [no functions] should [throw error]"
  )

  t.throws(
    () => {
      // @ts-expect-error - intentional to test runtime throw
      pipe(inc, 2)
    },
    /@asd14\/m\/pipe: expected 'fns\[1\]' to be 'Function', got 'Number'/,
    "given [a number as the second function] should [throw error naming the index]"
  )

  t.throws(
    () => {
      // @ts-expect-error - intentional to test runtime throw
      pipe(1, 2)
    },
    /@asd14\/m\/pipe: expected 'fns\[0\]' to be 'Function', got 'Number'/,
    "given [numbers as functions] should [throw error naming the first index]"
  )

  t.end()
})
