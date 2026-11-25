import test from "tape"

import { distinct } from "./distinct.js"

test("distinct - uncurried", t => {
  t.deepEqual(
    distinct([1, 2, 2, 3, 1, 3]),
    [1, 2, 3],
    "given [array with duplicate numbers] should [return unique values, first wins]"
  )

  t.deepEqual(
    distinct(["a", "b", "a", "c", "b"]),
    ["a", "b", "c"],
    "given [array with duplicate strings] should [return unique values]"
  )

  t.deepEqual(
    distinct([]),
    [],
    "given [empty array] should [return empty array]"
  )

  t.deepEqual(
    distinct([1]),
    [1],
    "given [single element] should [return same array]"
  )

  {
    const a = { id: 1 }
    const b = { id: 2 }

    t.deepEqual(
      distinct([a, b, a]),
      [a, b],
      "given [array with duplicate references] should [keep first occurrence]"
    )
  }

  t.deepEqual(
    distinct([Number.NaN, 1, Number.NaN, 2]),
    [Number.NaN, 1, 2],
    "given [array with duplicate NaN] should [treat NaN as equal]"
  )

  t.end()
})

test("distinct - invalid input", t => {
  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      distinct(42)
    },
    /expected 'input' to be 'Array', got 'Number'/,
    "given [a number as input] should [throw TypeError]"
  )

  t.end()
})
