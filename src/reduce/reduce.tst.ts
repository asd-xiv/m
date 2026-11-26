import { expect, test, describe } from "tstyche"

import { reduce } from "./reduce.js"

const sum = (acc: number, item: number): number => acc + item

describe("reduce", () => {
  test("reduce - uncurried", () => {
    expect(reduce(sum, 0, [1, 2, 3])).type.toBe<number>()

    {
      const toObject = (
        acc: Record<string, number>,
        item: number
      ): Record<string, number> => ({
        ...acc,
        [String(item)]: item,
      })

      expect(
        reduce(toObject, {} as Record<string, number>, [1, 2, 3])
      ).type.toBe<Record<string, number>>()
    }

    {
      const input = [1, 2, 3]

      expect(
        reduce(
          (acc, item) => {
            expect(acc).type.toBe<number>()
            expect(item).type.toBe<number>()

            return acc + item
          },
          0,
          input
        )
      ).type.toBe<number>()
    }

    expect(
      reduce(
        (acc: number, item: number) => {
          expect(item).type.toBe<number>()

          return acc + item
        },
        0,
        [1, 2, 3] as const
      )
    ).type.toBe<number>()

    {
      const input: readonly number[] = [1, 2, 3]

      expect(reduce(sum, 0, input)).type.toBe<number>()
    }
  })

  test("reduce - curried", () => {
    expect(reduce(sum, 0)([1, 2, 3])).type.toBe<number>()

    {
      const sumAll = reduce(sum, 0)

      expect(sumAll([1, 2, 3])).type.toBe<number>()
    }
  })

  test("reduce - invalid input", () => {
    {
      const input = ["a", "b"]

      expect(reduce).type.not.toBeCallableWith(sum, 0, input)
    }

    {
      const sumAll = reduce(sum, 0)
      const input = ["a", "b"]

      expect(sumAll).type.not.toBeCallableWith(input)
    }

    expect(reduce).type.not.toBeCallableWith(sum, "not a number", [1, 2, 3])

    expect(reduce(sum, 0)).type.not.toBeCallableWith(42)
  })
})
