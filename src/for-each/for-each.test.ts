import test from "tape"

import { forEach } from "./for-each.js"
import { inc } from "../inc/inc.js"

test("forEach - uncurried", t => {
  {
    const result: number[] = []

    forEach((item: number) => result.push(item), [1, 2, 3])

    t.deepEqual(
      result,
      [1, 2, 3],
      "given [a callback and an array] should [call fn for each element]"
    )
  }

  {
    const result: number[] = []

    forEach([inc, (item: number) => result.push(item)], [1, 2, 3])

    t.deepEqual(
      result,
      [2, 3, 4],
      "given [a pipe chain and an array] should [run piped functions over each element]"
    )
  }

  {
    const received: unknown[][] = []

    forEach(
      (...params: unknown[]) => {
        received.push(params)
      },
      [10, 20]
    )

    t.deepEqual(
      received,
      [[10], [20]],
      "given [a variadic callback] should [call it with the item only]"
    )
  }

  {
    const input: readonly number[] = [1, 2]
    const result: number[] = []

    forEach((item: number) => result.push(item), input)

    t.deepEqual(
      result,
      [1, 2],
      "given [a readonly array] should [call fn for each element]"
    )
  }

  t.end()
})

test("forEach - curried", t => {
  {
    const result: number[] = []

    forEach((item: number) => result.push(item))([1, 2, 3])

    t.deepEqual(
      result,
      [1, 2, 3],
      "given [a callback and an array, curried] should [call fn for each element]"
    )
  }

  t.end()
})

test("forEach - invalid input", t => {
  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      forEach(42, [1, 2])
    },
    /expected 'fn' to be 'Function' or 'Array', got 'Number'/,
    "given [a number as fn] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      forEach([inc, 1], [1, 2])
    },
    /@asd14\/m\/forEach: expected 'fn\[1\]' to be 'Function', got 'Number'/,
    "given [a pipe array with a number] should [name the slot]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      forEach((item: number) => item, "not-an-array")
    },
    /expected 'input' to be 'Array', got 'String'/,
    "given [a string as input] should [throw TypeError]"
  )

  t.end()
})
