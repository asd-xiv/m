import test from "tape"

import { sum } from "./sum.js"

test("sum - uncurried", t => {
  t.equal(sum(1, 2), 3, "given [1, 2] should [return 3]")
  t.equal(sum(0, 0), 0, "given [0, 0] should [return 0]")
  t.equal(sum(-1, 1), 0, "given [-1, 1] should [return 0]")
  t.equal(sum(1.5, 2.5), 4, "given [1.5, 2.5] should [return 4]")
  t.equal(sum(1, 2, 3, 4), 10, "given [1, 2, 3, 4] should [return 10]")
  t.equal(sum(42), 42, "given [single number] should [return that number]")
  t.equal(sum(), 0, "given [no arguments] should [return 0]")
  t.equal(sum([1, 2, 3]), 6, "given [array of numbers] should [return sum]")
  t.equal(
    sum([42]),
    42,
    "given [single-element array] should [return that number]"
  )
  t.equal(
    sum([0.5, Number.NaN]),
    Number.NaN,
    "given [NaN among the numbers] should [return NaN]"
  )
  t.equal(sum([]), 0, "given [empty array] should [return 0]")

  t.end()
})

test("sum - invalid input", t => {
  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      sum(1, "2", 3)
    },
    /expected 'params' to be 'Number', got 'String'/,
    "given [a string among the numbers] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      sum([1, "2", 3])
    },
    /expected 'params' to be 'Number', got 'String'/,
    "given [a string inside the array] should [throw TypeError]"
  )

  t.end()
})
