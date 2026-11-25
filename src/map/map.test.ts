import test from "tape"

import { map } from "./map.js"
import { sum } from "../sum/sum.js"

const square = (input: number): number => input * input
const inc = (input: number): number => input + 1

test("map - uncurried", t => {
  t.deepEqual(
    map(square, [1, 2, 3]),
    [1, 4, 9],
    "given [a transform fn and an array] should [return a new array with transformed elements]"
  )

  t.deepEqual(
    map([square, inc], [1, 2, 3]),
    [2, 5, 10],
    "given [a pipe array of fns] should [compose and apply to each element]"
  )

  t.deepEqual(
    map(square, []),
    [],
    "given [an empty array] should [return an empty array]"
  )

  const immutableTestArray = [1, 2, 3]

  t.notEqual(
    map(square, immutableTestArray),
    immutableTestArray,
    "given [an array] should [return a new array instance]"
  )

  {
    const received: unknown[][] = []

    map((...params: unknown[]) => received.push(params), [10, 20])

    t.deepEqual(
      received,
      [[10], [20]],
      "given [a variadic callback] should [call it with the item only]"
    )
  }

  {
    const input: readonly number[] = [1, 2]

    t.deepEqual(
      map(square, input),
      [1, 4],
      "given [a readonly array] should [return a new array]"
    )
  }

  t.deepEqual(
    map(sum, [[1, 2], [3]]),
    [3, 3],
    "given [a library function that reads its arity] should [not misread extra args]"
  )

  t.end()
})

test("map - curried", t => {
  t.deepEqual(
    map(square)([1, 2, 3]),
    [1, 4, 9],
    "given [a transform fn] should [return a new array with transformed elements]"
  )

  t.deepEqual(
    map([square, inc])([1, 2, 3]),
    [2, 5, 10],
    "given [a pipe array of fns] should [compose and apply to each element]"
  )

  t.end()
})

test("map - invalid input", t => {
  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      map(42, [1, 2])
    },
    /@asd14\/m\/map: expected 'fn' to be 'Function' or 'Array', got 'Number'/,
    "given [a number as fn] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      map([square, 1], [1, 2])
    },
    /@asd14\/m\/map: expected 'fn\[1\]' to be 'Function', got 'Number'/,
    "given [a pipe array with a number] should [name the slot]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      map([], [1, 2])
    },
    /@asd14\/m\/map: expected 'fn' to be 'NonEmpty', got 'Empty'/,
    "given [an empty pipe array] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing invalid input
      map(square, "not-an-array")
    },
    /expected 'input' to be 'Array', got 'String'/,
    "given [a string as input] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing invalid input
      map(square)(42)
    },
    /expected 'input' to be 'Array', got 'Number'/,
    "given [a number as input to curried form] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing invalid input
      map(square, null)
    },
    /expected 'input' to be 'Array', got 'Null'/,
    "given [null as input] should [throw TypeError]"
  )

  t.end()
})
