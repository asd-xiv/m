import test from "tape"

import { sortBy } from "./sort-by.js"

test("sortBy - uncurried", t => {
  t.deepEqual(
    sortBy(
      (a: { position: number }, b: { position: number }) =>
        a.position - b.position,
      [
        { id: 4, position: 5 },
        { id: 1, position: 3 },
        { id: 2, position: 2 },
      ]
    ),
    [
      { id: 2, position: 2 },
      { id: 1, position: 3 },
      { id: 4, position: 5 },
    ],
    "given [an array of objects and a custom compare function] should [return an sorted array]"
  )

  t.end()
})

test("sortBy - curried", t => {
  const input = [
    { id: 5, position: null },
    { id: 3 },
    { id: 1, position: 3 },
    { id: 2, position: 2 },
    { id: 4, position: 5 },
  ]

  t.deepEqual(
    sortBy(
      (a: { position?: number | null }, b: { position?: number | null }) =>
        (a.position ?? 0) - (b.position ?? 0)
    )(input),
    [
      { id: 5, position: null },
      { id: 3 },
      { id: 2, position: 2 },
      { id: 1, position: 3 },
      { id: 4, position: 5 },
    ],
    "given [an array of objects and a custom compare function] should [return an sorted array (curried)]"
  )

  t.end()
})

test("sortBy - invalid input", t => {
  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => sortBy("not a function", [1, 2, 3]),
    /expected 'fn' to be 'Function', got 'String'/,
    "given [a string as compare function] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => sortBy((a: number, b: number) => a - b, 42),
    /expected 'input' to be 'Array', got 'Number'/,
    "given [a number as input] should [throw TypeError]"
  )

  t.end()
})
