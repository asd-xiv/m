import { describe, expect, test } from "tstyche"

import { partition } from "./partition.js"

const isEven = (input: number): boolean => input % 2 === 0

describe("partition", () => {
  test("partition - uncurried", () => {
    expect(partition(isEven, [1, 2, 3])).type.toBe<[number[], number[]]>()

    expect(partition(isEven, [])).type.toBe<[number[], number[]]>()

    expect(
      partition([item => item.id, id => id > 0], [{ id: 1 }, { id: 2 }])
    ).type.toBe<[{ id: number }[], { id: number }[]]>()

    {
      // a readonly array is accepted
      const input: readonly number[] = [1, 2, 3]

      expect(partition(isEven, input)).type.toBe<[number[], number[]]>()
    }
  })

  test("partition - curried", () => {
    expect(partition(isEven)([1, 2, 3])).type.toBe<[number[], number[]]>()

    {
      // you only need to type the 1st function in the pipe chain, the rest
      // will get inferred
      const pickId = (item: { id: number }) => item.id
      const items = [{ id: 1 }, { id: 2 }]
      const partitionedItems = partition([pickId, id => id > 0])(items)

      expect(partitionedItems).type.toBe<[{ id: number }[], { id: number }[]]>()
    }
  })

  test("partition - invalid input", () => {
    expect(partition).type.not.toBeCallableWith(isEven, [1, "2", 3])

    expect(partition(isEven)).type.not.toBeCallableWith([1, "2", 3])
  })
})
