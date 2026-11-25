import test from "tape"

import { max } from "./max.js"

test("max - uncurried", t => {
  t.equal(
    max([3, 1, 4, 1, 5]),
    5,
    "given [an array of numbers] should [return the largest]"
  )

  t.equal(
    max([-3, -1, -2]),
    -1,
    "given [negative numbers] should [return the largest]"
  )

  t.equal(
    max([]),
    undefined,
    "given [an empty array] should [return undefined]"
  )

  t.equal(max([1, NaN, 2]), 2, "given [a NaN item] should [skip it]")

  t.equal(
    max([NaN, NaN]),
    undefined,
    "given [only NaN items] should [return undefined]"
  )

  {
    const input = [2, 9, 4] as const

    max(input)

    t.deepEqual(
      input,
      [2, 9, 4],
      "given [a readonly array] should [not mutate it]"
    )
  }

  t.end()
})

test("max - invalid input", t => {
  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      max("not-an-array")
    },
    /@asd14\/m\/max: expected 'input' to be 'Array', got 'String'/,
    "given [a string] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      max([1, 2, "3"])
    },
    /expected 'input\[2\]' to be 'Number', got 'String'/,
    "given [a non-number item] should [throw TypeError naming its path]"
  )

  t.end()
})
