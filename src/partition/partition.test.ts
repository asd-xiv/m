import test from "tape"

import { partition } from "./partition.js"
import { isSomething } from "../is/is.js"

const isEven = (input: number): boolean => input % 2 === 0

test("partition - uncurried", t => {
  t.deepEqual(
    partition(isEven, [1, 2, 3, 4, 5]),
    [
      [2, 4],
      [1, 3, 5],
    ],
    "given [isEven predicate and numbers] should [split into even and odd]"
  )

  t.deepEqual(
    partition(isEven, []),
    [[], []],
    "given [an empty array] should [return two empty arrays]"
  )

  t.deepEqual(
    partition(isEven, [1, 3, 5]),
    [[], [1, 3, 5]],
    "given [no matches] should [return empty first array and all in second]"
  )

  t.deepEqual(
    partition(isEven, [2, 4, 6]),
    [[2, 4, 6], []],
    "given [all match] should [return all in first array and empty second]"
  )

  {
    const items: { id: number; comments?: unknown[] }[] = [
      { id: 1, comments: [] },
      { id: 2 },
    ]

    t.deepEqual(
      partition([item => item.comments, isSomething], items),
      [[{ id: 1, comments: [] }], [{ id: 2 }]],
      "given [a predicate pipe] should [partition using the composed predicate]"
    )
  }

  t.end()
})

test("partition - curried", t => {
  t.deepEqual(
    partition(isEven)([1, 2, 3, 4, 5]),
    [
      [2, 4],
      [1, 3, 5],
    ],
    "given [isEven predicate curried] should [split into even and odd]"
  )

  t.deepEqual(
    partition([(item: { id: number }) => item.id, (id: number) => id > 2])([
      { id: 1 },
      { id: 3 },
      { id: 2 },
    ]),
    [[{ id: 3 }], [{ id: 1 }, { id: 2 }]],
    "given [a predicate pipe, curried] should [partition using the composed predicate]"
  )

  t.end()
})

test("partition - invalid input", t => {
  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      partition(42, [1, 2])
    },
    /expected 'fn' to be 'Function' or 'Array', got 'Number'/,
    "given [a number as fn] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      partition("foo", [1, 2])
    },
    /expected 'fn' to be 'Function' or 'Array', got 'String'/,
    "given [a string as fn] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      partition(null, [1, 2])
    },
    /expected 'fn' to be 'Function' or 'Array', got 'Null'/,
    "given [null as fn] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      partition(isEven, "not-an-array")
    },
    /expected 'input' to be 'Array'/,
    "given [non-array input] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      partition(isEven)(42)
    },
    /expected 'input' to be 'Array'/,
    "given [non-array input, curried] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => partition([isEven, 1], [1, 2]),
    /@asd14\/m\/partition: expected 'fn\[1\]' to be 'Function', got 'Number'/,
    "given [a pipe with a non-function] should [throw TypeError naming the function and its position]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => partition([isEven, 1]),
    /expected 'fn\[1\]' to be 'Function', got 'Number'/,
    "given [a bad pipe in the curried form] should [throw at the first call]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => partition([], [1, 2]),
    /expected 'fn' to be 'NonEmpty', got 'Empty'/,
    "given [an empty pipe] should [throw TypeError]"
  )

  {
    // A predicate passes only when it returns `true`
    const toNumber = (input: number) => input

    t.deepEqual(
      // @ts-expect-error -- testing runtime validation
      partition(toNumber, [0, 1, 2]),
      [[], [0, 1, 2]],
      "given [a predicate returning a truthy non-boolean] should [not pass any element]"
    )
  }

  t.end()
})
