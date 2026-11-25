import test from "tape"

import { mapIndexed } from "./map-indexed.js"

const multiplyByIndex = (item: number, index: number): number => item * index

test("mapIndexed - uncurried", t => {
  t.deepEqual(
    mapIndexed(multiplyByIndex, [5, 6, 7]),
    [0, 6, 14],
    "given [a fn using the index] should [return the transformed items]"
  )

  t.deepEqual(
    mapIndexed(multiplyByIndex, []),
    [],
    "given [an empty array] should [return an empty array]"
  )

  {
    const input = ["a", "b"]
    const calls: unknown[][] = []

    mapIndexed((...received: unknown[]) => calls.push(received), input)

    t.deepEqual(
      calls,
      [
        ["a", 0, input],
        ["b", 1, input],
      ],
      "given [a fn] should [call it with item, index and the array]"
    )
    t.equal(calls[0]?.[2], input, "given [a fn] should [pass the same array]")
  }

  {
    const calls: unknown[][] = []

    mapIndexed(
      [
        (...received: unknown[]) => {
          calls.push(received)

          return received[0]
        },
        (x: unknown) => x,
      ],
      [1, 2]
    )

    t.deepEqual(
      calls,
      [[1], [2]],
      "given [a pipe array] should [pass only the item to its first fn]"
    )
  }

  t.end()
})

test("mapIndexed - curried", t => {
  t.deepEqual(
    mapIndexed(multiplyByIndex)([5, 6, 7]),
    [0, 6, 14],
    "given [a fn, curried] should [return the transformed items]"
  )

  t.end()
})

test("mapIndexed - invalid input", t => {
  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      mapIndexed(42, [1])
    },
    /@asd14\/m\/mapIndexed: expected 'fn' to be 'Function' or 'Array', got 'Number'/,
    "given [a number as fn] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      mapIndexed(multiplyByIndex, "nope")
    },
    /@asd14\/m\/mapIndexed: expected 'input' to be 'Array', got 'String'/,
    "given [a string as input] should [throw TypeError]"
  )

  t.end()
})
