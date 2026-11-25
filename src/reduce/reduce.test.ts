import test from "tape"

import { reduce } from "./reduce.js"

const sum = (acc: number, item: number): number => acc + item

test("reduce - uncurried", t => {
  t.equals(
    reduce(sum, 0, [1, 2, 3]),
    6,
    "given [sum fn, 0 acc, [1,2,3]] should [return 6]"
  )

  t.deepEquals(
    reduce(
      (acc: Record<number, number>, next: number) => ({
        ...acc,
        [next]: next,
      }),
      {} as Record<number, number>,
      [1, 2, 3]
    ),
    { 1: 1, 2: 2, 3: 3 },
    "given [object-building fn] should [reduce array to object]"
  )

  {
    const received: unknown[][] = []

    reduce(
      (acc: number, ...params: unknown[]) => {
        received.push(params)

        return acc
      },
      0,
      [1, 2]
    )

    t.deepEqual(
      received,
      [[1], [2]],
      "given [a variadic reducer] should [call it with (acc, item) only]"
    )
  }

  {
    const input: readonly number[] = [1, 2]

    t.equal(
      reduce(sum, 0, input),
      3,
      "given [a readonly array] should [reduce it]"
    )
  }

  t.end()
})

test("reduce - curried", t => {
  t.equals(
    reduce(sum, 0)([1, 2, 3]),
    6,
    "given [sum fn and 0 acc applied to array of 1 2 3, curried] should [return 6]"
  )

  t.equals(
    reduce(sum, 0)([]),
    0,
    "given [empty array] should [return default acc]"
  )

  t.end()
})

test("reduce - invalid input", t => {
  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      reduce(42, 0, [1, 2])
    },
    /expected 'fn' to be 'Function', got 'Number'/,
    "given [a number as fn] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      reduce(sum)
    },
    /@asd14\/m\/reduce: expected 'defaultAcc' to be 'Any', got 'Missing'/,
    "given [only a reducer] should [name the missing defaultAcc]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      reduce(sum, 0, "not-an-array")
    },
    /expected 'input' to be 'Array', got 'String'/,
    "given [non-array input] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      reduce(sum, 0)(12)
    },
    /expected 'input' to be 'Array', got 'Number'/,
    "given [non-array input, curried] should [throw TypeError]"
  )

  t.end()
})
