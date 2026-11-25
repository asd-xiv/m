import test from "tape"

import { min } from "./min.js"

test("min - uncurried", t => {
  t.equal(
    min([3, 1, 4, 1, 5]),
    1,
    "given [an array of numbers] should [return the smallest]"
  )

  t.equal(
    min([-3, -1, -2]),
    -3,
    "given [negative numbers] should [return the smallest]"
  )

  t.equal(
    min([]),
    undefined,
    "given [an empty array] should [return undefined]"
  )

  t.equal(min([1, NaN, 2]), 1, "given [a NaN item] should [skip it]")

  t.equal(
    min([NaN, NaN]),
    undefined,
    "given [only NaN items] should [return undefined]"
  )

  {
    const input = [2, 9, 4] as const

    min(input)

    t.deepEqual(
      input,
      [2, 9, 4],
      "given [a readonly array] should [not mutate it]"
    )
  }

  t.end()
})

test("min - invalid input", t => {
  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      min("not-an-array")
    },
    /@asd14\/m\/min: expected 'input' to be 'Array', got 'String'/,
    "given [a string] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      min([1, 2, "3"])
    },
    /expected 'input\[2\]' to be 'Number', got 'String'/,
    "given [a non-number item] should [throw TypeError naming its path]"
  )

  t.end()
})
